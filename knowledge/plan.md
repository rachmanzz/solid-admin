> ## How to create / update plan.md
>
> **Purpose** — This file is the project's living roadmap. It communicates
> direction and intent for **solid-admin** so contributors and agents know what
> is planned, in progress, and explicitly out of scope.
>
> **How to create**
> 1. Describe the project in one or two sentences at the top.
> 2. Capture the current state factually (what exists today).
> 3. List goals as checkable items (`- [ ]` / `- [x]`), grouped by horizon
>    (e.g. Short-term / Medium-term).
> 4. Add a **Non-goals** section for things explicitly excluded, to bound scope.
>
> **How to update**
> - This file is **forward-looking**, so it may be revised as priorities shift:
>   add new goals, mark completed items with `- [x]`, and keep Non-goals accurate.
> - Prefer editing existing entries over duplicating them; keep the list
>   scannable. (Unlike the changelog and decision log, plan.md is not append-only.)
> - When a goal is completed or dropped for a recorded reason, consider also
>   adding a `changelog.md` entry and/or a `decision-log.md` entry so the history
>   stays coherent.

---

# Plan

This document tracks the direction of **solid-admin** — a collection of admin
dashboard templates built on SolidJS 2.x.

## Current state

- SolidJS 2.x (RC) application scaffolded from the `with-tanstack-router`
  template.
- Routing via TanStack Router (`src/routes/`, generated `routeTree.gen.ts`).
- Styling via Tailwind CSS v4 + daisyUI 5, configured centrally in
  `src/App.css`.
- Static-only build (`vite build` → `dist/client`); no server runtime.
- Documentation started: `docs/project-structures.md`, `docs/basic.md`,
  `README.md`, and a `knowledge/` base.
- Admin starter design: daisyUI drawer shell, dashboard, and users page.
- Component library: `src/components/layout/*` (shell, navbar, sidebar, page
  header) and `src/components/ui/*` (card, stat card, data table, empty state).
- Backend/API layer scaffolded (no live backend yet): `src/lib/api/*` fetch
  layer (`client.ts` + one function per endpoint), `lib/queries/keys.ts`,
  `src/hooks/*` TanStack Query wrappers, `QueryClientProvider` in `App.tsx`,
  and `@tanstack/solid-query` added as a dependency.

## Short-term goals

- [x] Populate `knowledge/plan.md`, `knowledge/changelog.md`, and
      `knowledge/decision-log.md` (this file set).
- [x] Build out real admin screens (dashboard, users table, forms) using daisyUI
      components instead of plain custom classes.
- [x] Ensure all components co-locate a Vitest test.
- [ ] Turn the `docs/` + `knowledge/` into a graphify knowledge graph.

## Medium-term goals

- [ ] Add a theme switcher using daisyUI `data-theme`.
- [ ] Add example data-loading patterns (loaders + `useLoaderData`) for tables.
- [ ] CI: lint + test + build on every push.
- [ ] Document deployment recipes for common static hosts.

## Non-goals (unless approved)

- SSR / server rendering (template is intentionally static).
- Backend or database coupling.
- Breaking changes to the existing routing/styling contracts.
