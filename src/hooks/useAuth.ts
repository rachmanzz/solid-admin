import { useMutation } from '@tanstack/solid-query';

import { login, logout, register } from '../lib/api/auth';
import type { Login, UserCreate } from '../lib/api/types';

export function useLogin() {
  return useMutation(() => ({
    mutationFn: (vars: Login) => login(vars),
  }));
}

export function useRegister() {
  return useMutation(() => ({
    mutationFn: (vars: UserCreate) => register(vars),
  }));
}

export function useLogout() {
  return useMutation(() => ({
    mutationFn: () => {
      logout();
      return Promise.resolve();
    },
  }));
}
