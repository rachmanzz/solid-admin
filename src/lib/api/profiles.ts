import { getRequestEvent } from '@solidjs/web';

// User profiles in the static demo manifest (public/users.json). This asset is
// not part of the future /api contract, so it is fetched from the public dir
// rather than through request()/API_BASE_URL.
export type UserProfile = {
  name: string;
  title: string;
};

const FALLBACK_PROFILE: UserProfile = { name: 'Unknown', title: 'No such user' };

// Resolves an absolute origin for same-origin URLs, which browsers require
// inside `new URL()` during SSR (getRequestEvent() is undefined in the
// browser, where location wins).
function resolveOrigin(): string {
  return getRequestEvent()?.request.url ?? location.origin;
}

export async function fetchUserProfile(id: string): Promise<UserProfile> {
  const response = await fetch(new URL('/users.json', resolveOrigin()));
  const users: Record<string, UserProfile> = await response.json();
  return users[id] ?? FALLBACK_PROFILE;
}