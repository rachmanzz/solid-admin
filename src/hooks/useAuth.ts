import { useMutation, useQuery } from '@tanstack/solid-query';

import { getMe, login } from '../lib/api/auth';
import { queryKeys } from '../lib/queries/keys';

// Reads the current session's user. Undefined until loaded or when signed out.
export function useMe() {
  return useQuery(() => ({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    retry: false,
  }));
}

export function useLogin() {
  return useMutation(() => ({
    mutationFn: (vars: { email: string; password: string }) => login(vars),
  }));
}
