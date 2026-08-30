import { useMutation, useQuery, useQueryClient } from '@tanstack/solid-query';

import { createUser, deleteUser, fetchUser, fetchUsers, updateUser } from '../lib/api/users';
import { queryKeys } from '../lib/queries/keys';
import type { User } from '../lib/api/types';

export function useUsers() {
  return useQuery(() => ({
    queryKey: queryKeys.users.all,
    queryFn: fetchUsers,
  }));
}

export function useUser(id: () => string) {
  return useQuery(() => ({
    queryKey: queryKeys.users.byId(id()),
    queryFn: () => fetchUser(id()),
  }));
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
  }));
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: ({ id, input }: { id: string; input: Partial<User> }) =>
      updateUser(id, input),
    onSuccess: (updated) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.users.byId(updated.id) }),
  }));
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
  }));
}
