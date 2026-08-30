---
name: backend
description: Conventions for organizing backend API handling in solid-admin — the fetch layer, TanStack Query usage, types, and how routes consume data. Read before creating, modifying, or refactoring any API/fetch/query code.
---

# Backend & API Organization

This skill defines **how API handling is organized** in solid-admin so data
fetching stays predictable, testable, and easy to change. It applies to any
code that talks to a backend: fetching, caching, mutations, auth, and types.

The organizing principle is **strict layering**. Each layer owns one concern
and only talks to the layer below it:

```
routes/  →  hooks/  →  lib/api/  →  HTTP
   │          │          │
   │       (TanStack Query)  (fetch wrapper)
   +—— consumes hooks, never fetch/query directly
```

## Directory layout

```
src/
├── lib/
│   ├── api/               # thin fetch layer — one function per endpoint
│   │   ├── client.ts      # shared request() wrapper (HTTP details live HERE)
│   │   ├── users.ts       # fetchUsers(), fetchUser(id), createUser(), ...
│   │   ├── auth.ts        # login(), logout(), getMe()
│   │   └── types.ts       # DTOs: User, AuthResponse, ErrorResponse, ...
│   ├── constants.ts       # API_BASE_URL, QUERY_KEY constants
│   ├── queries/
│   │   └── keys.ts        # query key factories (single source of truth)
│   └── utils.ts           # pure helpers (formatting, dates, no fetch)
├── hooks/
│   ├── useUsers.ts        # useQuery/useMutation wrappers for users
│   └── useAuth.ts         # auth queries/mutations + session state
└── routes/                # thin pages that consume hooks
```

## Layer rules (non-negotiable)

### 1. `lib/api/` — the fetch layer. Everything HTTP lives here.

- **One exported function per endpoint.** `fetchUsers()`, `fetchUser(id)`,
  `createUser(input)`, `updateUser(id, input)`. No function mixes two endpoints.
- Every function returns **typed data** and **throws** on non-2xx. No `console.log`
  of responses, no inline caching, no retries, no UI.
- All functions call the shared `request()` from `client.ts`. Never `fetch()`
  directly outside `client.ts` — otherwise HTTP details (base URL, headers,
  error normalization) get duplicated and drift.

```ts
// lib/api/users.ts
import { request } from './client';
import type { User } from './types';

export function fetchUsers(): Promise<User[]> {
  return request<User[]>('/users');
}

export function fetchUser(id: string): Promise<User> {
  return request<User>(`/users/${id}`);
}
```

### 2. `lib/api/client.ts` — the single `request()` wrapper.

Owns exactly one concern: turning a URL + options into a typed response or a
thrown `ApiError`. It centralizes:

- base URL (from `lib/constants.ts`),
- request headers (`Content-Type`, auth token from session),
- response parsing and error normalization (`ApiError { status, message }`),
- timeout (via `AbortSignal.timeout`).

```ts
// lib/api/client.ts
import { API_BASE_URL } from '../constants';
import type { ApiError, ErrorResponse } from './types';

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers },
    signal: init.signal ?? AbortSignal.timeout(10_000),
  });
  const body = (await res.json().catch(() => null)) as ErrorResponse | null;
  if (!res.ok) {
    const err = new Error(body?.message ?? `Request failed (${res.status})`) as Error & { status?: number };
    (err as { status?: number }).status = res.status;
    throw err;
  }
  return body as T;
}
```

### 3. `lib/queries/keys.ts` — query keys are a single source of truth.

Never invent query keys inline. Use factory functions so cache invalidation
stays correct and consistent:

```ts
// lib/queries/keys.ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    byId: (id: string) => ['users', id] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
};
```

Invalidate by prefix: `queryClient.invalidateQueries({ queryKey: queryKeys.users.all })`
wipes every user query; `queryKeys.users.byId(id)` wipes one.

### 4. `hooks/` — TanStack Query glue. The only layer that calls Query.

> API note: this project uses `@tanstack/solid-query@6.0.0-rc.1` (as required for
> Solid 2 RC). Its hooks are named `useQuery` / `useMutation` / `useQueryClient`
> — **not** the older v5 `createQuery` / `createMutation`. Use the `use*` names.

- A hook wraps `useQuery` (reads) or `useMutation` (writes) around a
  `lib/api` function and owns the query key + invalidation.
- **Routes and components never call `fetch` or `useQuery` directly** — they
  call hooks. This keeps the data contract in one place per resource.
- Reads:

```tsx
// hooks/useUsers.ts
import { useQuery } from '@tanstack/solid-query';
import { fetchUsers, fetchUser } from '../lib/api/users';
import { queryKeys } from '../lib/queries/keys';

export function useUsers() {
  return useQuery(() => ({ queryKey: queryKeys.users.all, queryFn: fetchUsers }));
}

export function useUser(id: () => string) {
  return useQuery(() => ({ queryKey: queryKeys.users.byId(id()), queryFn: () => fetchUser(id()) }));
}
```

Note the options are passed as an accessor (`() => ({...})`) so they are reactive
(Solid reads the query key/params dynamically). Mutations follow the same shape.

- Writes (mutations) must invalidate/update the affected queries:

```tsx
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
  }));
}
```

### 5. `routes/` — thin pages that consume hooks.

A route declares the loader/head and composes UI + one or two hooks. It decides
**what** to render from the hook's `data`/`isPending`/`isError`, using shared
`LoadingSkeleton` / `ErrorState` / `EmptyState` components. No fetch or query
logic lives here.

```tsx
const users = useUsers();
return (
  <Show when={users.data} fallback={<LoadingSkeleton />}>
    <DataTable columns={usersColumns} rows={users.data!} rowKey={(u) => u.id} />
  </Show>
);
```

### 6. `components/ui/` — stays pure.

Never import `hooks/`, `lib/api`, or `useQuery` into `components/ui`. UI atoms
receive data via props. This keeps the component layer reusable and trivially
testable.

## Types

All API DTOs live in `lib/api/types.ts`. Define response shapes and shared
business types here; import them into hooks and routes. Do not scatter interface
definitions across feature folders. `lib/constants.ts` holds `API_BASE_URL` and
key prefixes. `lib/utils.ts` holds pure formatting/transform helpers — keep
formatting out of components and out of the fetch layer.

## Error handling & states

- `client.ts` throws a normalized `ApiError`; hooks surface it through the
  query's `error` / `isError`.
- Every data-consuming page shows one of: **loading** (`LoadingSkeleton`),
  **error** (`ErrorState` with retry), **empty** (`EmptyState`), or **data**.
- Mutations: on success invalidate relevant keys; on error show an inline
  message or toast — never a persistent spinner.

## When to split / apply

- **Add a new endpoint?** One function in the right `lib/api/*.ts` module.
- **Reuse the same query in two routes?** Create/extend the matching hook.
- **Query-only used in one route and tiny?** Inline it via the shared hook
  factory; do not create a pile of one-off hooks (YAGNI). Split when it repeats.
- **A component imports a hook?** That is a sign the data fetching belongs
  higher up (in the route) and the value should be passed as a prop.

## Testing

- Unit-test `lib/api` with mocked `globalThis.fetch` (response + error cases).
- Test hooks against a `QueryClient` (render a wrapper component using the hook)
  for loading → data / error transitions.
- Do not test `fetch` calls inside routes; test the hook + pass fake data to the
  UI component.
