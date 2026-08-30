import { request } from './client';
import type { AuthResponse, User } from './types';

export function login(credentials: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function logout(): Promise<void> {
  return request<void>('/auth/logout', { method: 'POST' });
}

export function getMe(): Promise<User> {
  return request<User>('/auth/me');
}
