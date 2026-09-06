import { request } from './client';
import type { User, UserCreate, UserUpdate } from './types';

// One function per endpoint. Each returns typed data or throws; none of these
// cache, retry, or render UI. That is the job of hooks/Query.
export function fetchUsers(): Promise<User[]> {
  return request<User[]>('/api/v1/users');
}

export function fetchUser(id: string): Promise<User> {
  return request<User>(`/api/v1/users/${id}`);
}

export function createUser(input: UserCreate): Promise<User> {
  return request<User>('/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateUser(id: string, input: UserUpdate): Promise<User> {
  return request<User>(`/api/v1/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteUser(id: string): Promise<void> {
  return request<void>(`/api/v1/users/${id}`, { method: 'DELETE' });
}
