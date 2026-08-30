// Query key factories: the single source of truth for TanStack Query keys, so
// reads and invalidations always refer to the same cache entries.
export const queryKeys = {
  users: {
    all: ['users'] as const,
    byId: (id: string) => ['users', id] as const,
  },
  profiles: {
    all: ['profiles'] as const,
    byId: (id: string) => ['profiles', id] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
};
