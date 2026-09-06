import { request } from './client';
import { setToken } from './token';
import type { AuthResponse, Login, User, UserCreate, UserUpdate } from './types';

// Auth data layer. login/register persist the returned JWT via token.ts so
// subsequent requests send it as a Bearer header. No UI lives here — that is
// the job of hooks and routes.

async function persistAuth(response: AuthResponse): Promise<AuthResponse> {
  setToken(response.token);
  return response;
}

export async function login(credentials: Login): Promise<AuthResponse> {
  const response = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return persistAuth(response);
}

export async function register(input: UserCreate): Promise<AuthResponse> {
  const response = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return persistAuth(response);
}

export function logout(): void {
  setToken(null);
}

// Authenticated user management (requires a Bearer token set by login/register).
export function fetchAuthUsers(): Promise<User[]> {
  return request<User[]>('/auth/users');
}

export function createAuthUser(input: UserCreate): Promise<User> {
  return request<User>('/auth/users', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateAuthUser(id: string, input: UserUpdate): Promise<User> {
  return request<User>(`/auth/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteAuthUser(id: string): Promise<void> {
  return request<void>(`/auth/users/${id}`, { method: 'DELETE' });
}
