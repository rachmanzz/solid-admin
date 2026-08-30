import { request } from './client';
import type { User } from './types';

// One function per endpoint. Each returns typed data or throws; none of these
// cache, retry, or render UI. That is the job of hooks/Query.
export function fetchUsers(): Promise<User[]> {
  return request<User[]>('/users');
}

export function fetchUser(id: string): Promise<User> {
  return request<User>(`/users/${id}`);
}

export function createUser(input: Pick<User, 'name' | 'title' | 'role'>): Promise<User> {
  return request<User>('/users', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateUser(id: string, input: Partial<User>): Promise<User> {
  return request<User>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteUser(id: string): Promise<void> {
  return request<void>(`/users/${id}`, { method: 'DELETE' });
}
