import { fetchUserManifest } from './manifest';
import type { User } from './types';

// One function per endpoint, backed by the static demo manifest. Each returns
// typed data or throws; none of these cache, retry, or render UI. That is the
// job of hooks/Query. Swap these bodies for request() calls when a real /api
// backend exists.
export async function fetchUsers(): Promise<User[]> {
  const manifest = await fetchUserManifest();
  return Object.values(manifest);
}

export async function fetchUser(id: string): Promise<User> {
  const manifest = await fetchUserManifest();
  const user = manifest[id];
  if (!user) {
    throw new Error(`User not found (${id})`);
  }
  return user;
}

export function createUser(_input: Pick<User, 'name' | 'title' | 'role'>): Promise<User> {
  throw new Error('createUser is not implemented against the static manifest');
}

export function updateUser(_id: string, _input: Partial<User>): Promise<User> {
  throw new Error('updateUser is not implemented against the static manifest');
}

export function deleteUser(_id: string): Promise<void> {
  throw new Error('deleteUser is not implemented against the static manifest');
}
