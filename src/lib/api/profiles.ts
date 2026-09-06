import { fetchUserManifest } from './manifest';
import type { User } from './types';

// User profiles in the static demo manifest (public/users.json). This asset is
// not part of the future /api contract, so it is fetched from the public dir
// rather than through request()/API_BASE_URL.
export type UserProfile = {
  name: string;
  title: string;
};

const FALLBACK_PROFILE: UserProfile = { name: 'Unknown', title: 'No such user' };

export async function fetchUserProfile(id: string): Promise<UserProfile> {
  const manifest = await fetchUserManifest();
  const user: User | undefined = manifest[id];
  if (!user) {
    return FALLBACK_PROFILE;
  }
  return { name: user.name, title: user.title };
}
