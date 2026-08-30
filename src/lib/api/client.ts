import { API_BASE_URL } from '../constants';
import type { ApiError, ErrorResponse } from './types';

// The single place that knows how to talk HTTP: base URL, headers, timeout,
// and error normalization. Every lib/api function goes through here so those
// details never get duplicated or drift.
export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    signal: init.signal ?? AbortSignal.timeout(10_000),
  });

  const body = (await res.json().catch(() => null)) as ErrorResponse | null;

  if (!res.ok) {
    const error: ApiError = new Error(
      body?.message ?? `Request failed (${res.status})`,
    ) as ApiError;
    error.status = res.status;
    throw error;
  }

  return body as T;
}
