import { API_BASE_URL } from '../constants';
import { getToken } from './token';
import type { ApiError, ApiErrorPayload } from './types';

// The API wraps responses in an envelope: { success: true, data } on success
// and { success: false, error } on failure. Some auth endpoints return their
// payload directly, so this unwraps the envelope when present and otherwise
// returns the raw body.
interface Envelope<T> {
  success: boolean;
  data?: T;
  error?: ApiErrorPayload;
}

function errorMessage(error: ApiErrorPayload | undefined, status: number): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') return error.message;
    return JSON.stringify(error);
  }
  return `Request failed (${status})`;
}

// The single place that knows how to talk HTTP: base URL, headers, timeout,
// and error normalization. Every lib/api function goes through here so those
// details never get duplicated or drift.
export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
    signal: init.signal ?? AbortSignal.timeout(10_000),
  });

  const body = (await res.json().catch(() => null)) as Envelope<T> | T | null;

  const envelope = body as Envelope<T> | null;
  const failed =
    !res.ok ||
    (envelope !== null && typeof envelope === 'object' && 'success' in envelope && !envelope.success);

  if (failed) {
    const error: ApiError = new Error(
      envelope !== null && 'error' in envelope
        ? errorMessage(envelope.error, res.status)
        : `Request failed (${res.status})`,
    ) as ApiError;
    error.status = res.status;
    throw error;
  }

  if (envelope !== null && typeof envelope === 'object' && 'success' in envelope && 'data' in envelope) {
    return envelope.data as T;
  }

  return body as T;
}
