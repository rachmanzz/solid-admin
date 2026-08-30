---
name: general
description: Core engineering principles for the solid-admin project. Read when creating, reviewing, or refactoring components, routes, API calls, or any non-trivial code.
---

# SRP Principle (Single Responsibility)

A module, component, file, or function should have **one reason to change**. If you find yourself explaining "this file handles X *and* Y", it is already too broad and should be split before the logic grows further.

**Grouping:** keep one concern per file. A route file owns navigation, loader, and layout — but not API internals, data transformations, or UI atomics. An API module owns the fetch contract and response shape — but not caching strategy or UI rendering. If a file mixes two unrelated concepts (e.g. formatting logic *and* data fetching), extract one into its own module.

**Max lines as a signal, not a rule.** A component under 120 lines is usually fine; beyond 200 lines start questioning whether it is doing two things. But length alone is not the problem — a 150-line `switch` statement with one responsibility is fine, while a 60-line function doing two unrelated tasks is not. Split when a new responsibility appears, not just when the file is long.

**Component structure:** each component should do one thing well. A `StatCard` renders a single stat — it does not fetch data, format currency, or manage modal state. A `UserTable` renders rows — it does not decide which columns exist or what happens on row click. Extract logic into hooks, utilities, or parent components as needed. In Solid, keep components pure: props in, markup out, no side effects in the render body.

**API / fetch structure:** each API function should call one endpoint and return one shaped response. `fetchUser(id)` calls `/users/:id` and returns a `User` — it does not cache, retry, or transform. Keep the fetch layer thin so it is reusable and testable. Co-locate related API calls in a single module (`lib/api/users.ts`) but one function per endpoint.

**TanStack Query usage:** TanStack Query handles caching, retries, background refetching, and stale-while-revalidate — so your components do not have to. Use `createQuery` for data reads and `createMutation` for writes. The query key encodes *what* was fetched; the query function is a thin wrapper around your API layer. Never mix fetch logic with query orchestration. Example pattern:

```tsx
// lib/api/users.ts
export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

// src/routes/users.$id.tsx
const userQuery = createQuery(() => ({
  queryKey: ['user', params.id],
  queryFn: () => fetchUser(params.id),
}));
```

---

# KISS Principle (Keep It Simple, Stupid)

If you cannot explain a solution to a junior developer in two sentences, it is too complicated. Favor the approach that is easiest to understand, easiest to change, and hardest to break.

**When to apply:** every decision. Use built-in Solid primitives (`createSignal`, `createEffect`, `For`, `Show`, `Switch`) before reaching for custom abstractions. Use native browser APIs (`fetch`, `URL`, `JSON`) before importing a utility library. Use daisyUI component classes before writing custom CSS. Every dependency is a liability — only add it when the built-in path is genuinely worse.

**When to decompose:** if a component has nested ternaries, inline object literals in JSX props, or three or more `classList` conditions, it has grown too clever. Break it into named subcomponents or extract the logic into a plain function. Simplicity is not about fewer lines — it is about fewer surprises.

**Concrete examples of applying KISS in this project:**

- Prefer a `For` loop over a chain of `.map` calls.
- Prefer a direct `class="btn btn-primary"` over a computed string like `class={clsx(active ? 'btn-primary' : 'btn-ghost')}`.
- Prefer a single `createRouteLoader` over manual `createEffect` + `setSignal` + loading-state tracking.
- Prefer `date.toLocaleDateString()` over importing `date-fns` for one formatting call.
- Prefer inline `if` guards at the top of a function over nested `try/catch` blocks.

---

# DRY Principle (Do Not Repeat Yourself)

Duplication is not a code smell — **premature abstraction** is. Two identical lines of code are fine; two identical *intentions* are not.

**When to extract:** when you need to change the same logic in two places, or when three or more call sites share the same structure with different values (data-driven, not copy-paste driven). A `StatCard` used three times with different labels is fine as a component; a `StatCard` that also fetches, formats, and animates is not a component — it is a feature.

**Concrete pattern in this project:** if a `createQuery` call appears in two routes with the same `queryKey` and `queryFn`, move the query into a shared hook (`useUserQuery`) or a shared function (`fetchUsers`). If two components render the same table structure with different data, extract a `DataTable<T>` component with generic props. Do not abstract until the pattern has appeared at least twice with clear intent to change together.

---

# YAGNI Principle (You Aren't Gonna Need It)

Build only what the current task requires. No speculative features, no "just in case" abstractions, no premature performance tuning.

**When to ignore:** when the feature is *actually* planned in the roadmap and the cost of adding it later is significantly higher than adding it now (e.g. a theme switcher that requires `data-theme` wiring from day one). In that case, the abstraction is justified — it is not speculation.

**When to split:** if a component is designed for a future feature that does not exist yet, remove the dead code and add it when the feature arrives. Dead code rots silently — it is not tested, not reviewed, and becomes a trap when the assumption behind it turns out to be wrong. A comment "we might need this later" is not a reason to keep it.

---

# Composition Over Inheritance

Solid is not class-based — there is no inheritance. But the principle still applies: build small, composable pieces and combine them, rather than building one monolithic component that does everything.

**When to compose:** when a UI pattern repeats with variations. A `Card`, `CardBody`, `CardHeader`, `CardFooter` set is composable; a single `<Card title="..." description="..." action="..." footer="...">` with four props is not. Composition gives the caller control over layout and content.

**Concrete pattern:** instead of a single `AdminLayout` component with props for sidebar, header, content, and footer, compose them:

```tsx
// Composable — caller controls the layout
<DrawerLayout>
  <Navbar />
  <Sidebar />
  <main>{children}</main>
</DrawerLayout>
```

This is exactly how the `docs` layout works: `<Header>` + `<Sidebar>` + `<Content>` are separate elements in the template, not props on a single component.

---

# Separation of Concerns

Every layer of the application should own exactly one concern. Conventions in this project:

| Layer       | Owns                                | Does not own                       |
|-------------|-------------------------------------|------------------------------------|
| Route file  | Navigation, loader, page-level head | API internals, shared UI atoms     |
| Component   | Rendering one UI unit from props    | Data fetching, URL management      |
| API module  | Fetch contract + response shape     | Caching, retries, UI rendering     |
| Query hook  | Cache key + query function          | Fetch implementation, UI rendering |
| CSS (Tailwind) | Visual presentation             | Behavior, data flow                |

If you find a route file importing `fetch()` directly, extract it to an API module. If you find a component calling `createQuery`, move the query to a hook. If you find a CSS file containing JavaScript, something has gone very wrong.

---

# Error Handling

Fail loudly in development. Fail gracefully in production. Never swallow errors silently.

**Pattern for API calls:** let TanStack Query handle retries and error states. The query object exposes `isError`, `error`, and `status` — use them in the UI to show a meaningful message, not a blank screen.

**Pattern for mutations:** `createMutation` has `onError` and `onSuccess` callbacks. Show a toast or inline error on failure; invalidate the relevant query on success. Never leave the user staring at a spinner after a failed mutation.

**Pattern for components:** if a component receives invalid props, log a warning in development (`console.warn`) but render gracefully — do not throw. The exception is data-shape mismatches from API responses, where failing fast prevents silent corruption.

---

# Testing Strategy

Test behavior, not implementation. A test that breaks when you refactor a function name is a bad test.

**What to test:** user-facing behavior (clicks, navigation, visible text). API response handling (loading → data → error states). Component rendering with various prop combinations. Route loaders returning the expected shape.

**What not to test:** internal state transitions, CSS class names, DOM structure, third-party library internals. These are implementation details that change frequently and tell you nothing about whether the feature works.

**Tooling:** `@solidjs/testing-library` renders components in a real DOM; `captureArtifact()` from `@solidjs/diagnostics` captures reactive diagnostics; Vitest runs the suite. Co-locate tests next to the source (`Counter.test.tsx` next to `Counter.tsx`).

---

# Component Organization

`src/components/` is organized into subfolders by role. Strictly separate **layout**, **ui**, and **page-level** logic.

```
src/components/
├── layout/   # site chrome: AppShell, Navbar, Sidebar, PageHeader
├── ui/       # reusable, context-free atoms: Card, StatCard, DataTable, EmptyState
└── (page-level components live next to the route, never in components/)
```

**Who owns what:**

- **`src/routes/` owns data + page layout.** A route declares the loader, the `head`, and composes layout components. It decides *which* cards/tables appear and *what data* fills them. Routes may import from `components/`, but components must never import routes.
- **`src/components/layout/` owns the page chrome** — the shell, navigation, and page header. This is where `__root.tsx`'s markup lives, extracted so the route file stays a thin declaration.
- **`src/components/ui/` owns reusable atoms** with no context. A `StatCard` renders one stat from props; a `DataTable<T>` renders headers/rows for any `T`; a `Card` provides consistent padding/shadow. None of these know about routes, loaders, or specific data.

**When to put something in `components/` vs keep it in the route:** extract a component when it is (a) reused in two or more places, or (b) large enough to obscure the route's intent. If a piece of markup is only used by one route and is small, keep it in the route. Premature extraction violates YAGNI.

**Conventions:**

- One component per file, PascalCase filename and export (`StatCard.tsx` → `export default function StatCard`).
- Use `ParentProps` / explicit `JSX.Element` props; destructure with defaults where a prop is optional.
- Components in `components/` must be **pure**: props in, markup out, no `createEffect` side effects in the render body, no `setSignal` on mount for side effects.
- Co-locate a `*.test.tsx` next to each source file, testing behavior (visible text/output), not DOM structure.

**Correct example:**

```tsx
// src/components/ui/StatCard.tsx
export default function StatCard(props: { label: string; value: string; trend?: string }) {
  return (
    <div class="stat">
      <div class="stat-title">{props.label}</div>
      <div class="stat-value">{props.value}</div>
    </div>
  );
}
```

**Incorrect example:** a `StatCard` that also calls `createQuery`, reads the router, or formats with a library — it now has three reasons to change. Keep data fetching out of `components/ui`; put shared data hooks in `src/hooks/` and fetch contracts in `src/lib/api/`.
