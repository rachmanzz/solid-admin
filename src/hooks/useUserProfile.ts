import { useQuery } from '@tanstack/solid-query';
import { queryKeys } from '../lib/queries/keys';
import { fetchUserProfile, type UserProfile } from '../lib/api/profiles';

export function useUserProfile(id: string) {
  return useQuery(() => ({
    queryKey: queryKeys.profiles.byId(id),
    queryFn: () => fetchUserProfile(id),
  }));
}

export type { UserProfile };
