# solid-admin — Basic Guide

> **solid-admin** is a collection of admin dashboard templates built on top of
> **SolidJS 2.x**. It pairs Solid's fine-grained reactivity with TanStack
> Router for typesafe navigation and a Tailwind CSS v4 + daisyUI 5 styling
> system, giving you a fast, fully static admin UI you can deploy anywhere.

This guide gets you from zero to a running admin screen, and shows you how the
project is meant to be styled and extended.

---

## What is solid-admin?

 Think of it as a **turnkey admin shell** rather than a single fixed app:

- **Built on SolidJS 2.x** — components run once, reactivity is fine-grained
  through signals. No virtual DOM, no re-render thrash.
- **Admin-focused** — the templates target dashboards, tables, forms, and
  navigation layouts common to back-office apps.
- **Static by default** — `vite build` emits a purely static site to
  `dist/client`. Deploy it to any static host (Netlify, Vercel, GitHub Pages,
  S3, …).
- **Typesafe routing** — powered by TanStack Router; a typo in a route or its
  params is a compile error, not a runtime surprise.
- **Opinionated styling** — Tailwind CSS v4 plus daisyUI 5 components, so the
  look stays consistent with minimal custom CSS.

---

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | SolidJS `^2.0.0-rc` (`solid-js`, `@solidjs/web`) |
| Routing        | `@tanstack/solid-router` + `@tanstack/router-plugin` |
| Styling        | Tailwind CSS v4 (`@tailwindcss/vite`)             |
| UI components  | daisyUI 5 (`daisyui` plugin)                      |
| Build tool     | Vite `^8`                                         |
| Testing        | Vitest + `@solidjs/testing-library`               |
| Linting        | oxlint (`oxlint.config.mjs`)                      |

---

## Getting started

### Prerequisites

- Node.js (see `package.json` engines/lockfile for the pinned version)
- A package manager — `pnpm` is used by the template, but `npm`/`yarn` work too

### Install and run

```bash
pnpm install      # install dependencies
pnpm dev          # start the dev server at http://localhost:3000
```

The page hot-reloads as you edit. When you add or rename files under
`src/routes/`, TanStack's plugin regenerates `src/routeTree.gen.ts`
automatically.

### Scripts

| Script          | What it does                                     |
| --------------- | ------------------------------------------------ |
| `pnpm dev`      | Start the Vite dev server                        |
| `pnpm build`    | Build the static site to `dist/client`           |
| `pnpm serve`    | Preview the production build locally             |
| `pnpm test`     | Run the Vitest suite                             |
| `pnpm lint`     | Lint `src` with oxlint                           |

---

## The styling system

Styling is intentionally centralized. `src/App.css` is the entire setup:

```css
@import "tailwindcss";
@plugin "daisyui";
```

### Tailwind CSS v4

There is **no `tailwind.config.js`**. In v4 the config lives in CSS — you
import Tailwind and then extend it with `@theme` blocks or plugins directly in
your stylesheet. Utility classes (`flex`, `grid`, `p-4`, `text-xl`, …) work
everywhere out of the box.

### daisyUI 5

daisyUI is loaded as a Tailwind plugin via `@plugin "daisyui"`. That gives you
a large set of ready-made, themeable components: `btn`, `card`, `navbar`,
`table`, `badge`, `modal`, `drawer`, and more. Themes are switched with the
`data-theme` attribute (e.g. `<html data-theme="dark">`) — no rebuild needed.

### Convention: always use daisyUI components

When writing JSX/HTML in this project, **prefer daisyUI utility classes over
hand-rolled CSS**. This keeps the admin UI consistent and themeable.

Before (plain custom class):

```tsx
<button class="increment" type="button" onClick={...}>
  Clicks: {count()}
</button>
```

After (daisyUI):

```tsx
<button class="btn btn-primary" type="button" onClick={...}>
  Clicks: {count()}
</button>
```

A small admin card example:

```tsx
<section class="card bg-base-200 shadow-xl w-80">
  <div class="card-body">
    <h2 class="card-title">Users</h2>
    <p>1,248 active this week</p>
    <div class="card-actions justify-end">
      <button class="btn btn-sm btn-primary">View</button>
    </div>
  </div>
</section>
```

> **Tip:** daisyUI semantic classes like `bg-base-200`, `text-base-content`, and
> `btn-primary` automatically follow the active theme, so your admin stays
> correct in both light and dark modes.

---

## Routing with TanStack Router

Routes live in `src/routes/`. Each file becomes a route; the tree is generated
for you.

Add a new admin page — create `src/routes/users.tsx`:

```tsx
import { createFileRoute, Link } from '@tanstack/solid-router';

function UsersPage() {
  return (
    <main class="p-6">
      <h1 class="text-2xl font-bold mb-4">Users</h1>
      <Link to="/" class="btn btn-ghost btn-sm">← Back home</Link>
    </main>
  );
}

export const Route = createFileRoute('/users')({
  head: () => ({ meta: [{ title: 'Users - solid-admin' }] }),
  component: UsersPage,
});
```

Navigate typesafely from anywhere:

```tsx
<Link to="/users/$id" params={{ id: '1' }}>User 1</Link>
```

### Loader-driven data

Keep fetching out of your components. Declare a `loader` and read it with
`Route.useLoaderData()`:

```tsx
export const Route = createFileRoute('/users/$id')({
  loader: ({ params }) => fetchUser(params.id),
  component: UserPage,
});

function UserPage() {
  const user = Route.useLoaderData(); // typed + reactive to params
  return <h2 class="text-xl">{user().name}</h2>;
}
```

---

## Building your own components

Reusable UI goes in `src/components/`. Co-locate a test next to it:

```tsx
// src/components/StatCard.tsx
export default function StatCard(props: { label: string; value: string }) {
  return (
    <section class="card bg-base-100 shadow">
      <div class="card-body">
        <span class="text-sm opacity-70">{props.label}</span>
        <span class="text-2xl font-bold">{props.value}</span>
      </div>
    </section>
  );
}
```

Test it:

```tsx
// src/components/StatCard.test.tsx
import { render, screen } from '@solidjs/testing-library';
import StatCard from './StatCard';

test('renders label and value', () => {
  render(() => <StatCard label="Revenue" value="$12k" />);
  expect(screen.getByText('Revenue')).toBeInTheDocument();
  expect(screen.getByText('$12k')).toBeInTheDocument();
});
```

---

## Building and deploying

```bash
pnpm build     # outputs a static site to dist/client
pnpm serve     # preview it locally
```

Deploy the **`dist/client`** folder to any static host. There are no server
dependencies, so nothing else is required.

---

## Quick mental model

- **`src/App.tsx`** — creates the router and registers its types.
- **`src/Document.tsx`** — the HTML document shell.
- **`src/routes/`** — your pages; the route tree is generated.
- **`src/components/`** — reusable, tested UI pieces.
- **`src/App.css`** — the one place styling is configured (Tailwind + daisyUI).

For the full file-by-file reference, see [`project-structures.md`](./project-structures.md).
