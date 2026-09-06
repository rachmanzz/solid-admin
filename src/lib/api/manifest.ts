import { getRequestEvent } from '@solidjs/web';

import type { User } from './types';

// Static demo data (public/users.json). This manifest is a stand-in for the
// future /api contract, so it is fetched from the public dir rather than
// through request()/API_BASE_URL. Both the users and profiles API modules read
// from here so the list and detail pages stay in sync.
export type UserManifest = Record<string, User>;

// Resolves an absolute origin for same-origin URLs, which browsers require
// inside `new URL()` during SSR (getRequestEvent() is undefined in the
// browser, where location wins).
function resolveOrigin(): string {
  return getRequestEvent()?.request.url ?? location.origin;
}

export async function fetchUserManifest(): Promise<UserManifest> {
  const response = await fetch(new URL('/users.json', resolveOrigin()));
  return response.json();
}
