# solid-admin

A collection of **admin dashboard templates built on [SolidJS 2.x](https://solidjs.com)**.

solid-admin pairs Solid's fine-grained reactivity with [TanStack Router](https://tanstack.com/router) for typesafe navigation and a **Tailwind CSS v4 + daisyUI 5** styling system. The result is a fast, fully static admin UI you can deploy anywhere.

## Why solid-admin?

- **Built on SolidJS 2.x** — components run once; reactivity is fine-grained through signals. No virtual DOM, no re-render overhead.
- **Admin-focused** — templates target dashboards, tables, forms, and navigation layouts common to back-office apps.
- **Static by default** — `vite build` emits a purely static site to `dist/client`. Deploy it to any static host (Netlify, Vercel, GitHub Pages, S3, …).
- **Typesafe routing** — powered by TanStack Router; a typo in a route path or its params is a compile error.
- **Opinionated styling** — Tailwind CSS v4 plus daisyUI 5 components, keeping the look consistent with minimal custom CSS.

## Tech stack

| Concern       | Choice                                              |
| ------------- | --------------------------------------------------- |
| Framework     | SolidJS `^2.0.0-rc` (`solid-js`, `@solidjs/web`)    |
| Routing       | `@tanstack/solid-router` + `@tanstack/router-plugin` |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`)               |
| UI components | daisyUI 5 (`daisyui` plugin)                        |
| Build tool    | Vite `^8`                                           |
| Testing       | Vitest + `@solidjs/testing-library`                 |
| Linting       | oxlint (`oxlint.config.mjs`)                        |

## Getting started

```bash
bun install      # install dependencies
bun dev          # start the dev server at http://localhost:3000
```

The page hot-reloads as you edit. Adding or renaming files under `src/routes/`
regenerates `src/routeTree.gen.ts` automatically.

## Available scripts

| Script       | What it does                           |
| ------------ | -------------------------------------- |
| `bun dev`   | Start the Vite dev server              |
| `bun build` | Build the static site to `dist/client` |
| `bun serve` | Preview the production build locally   |
| `bun test`  | Run the Vitest suite                   |
| `bun lint`  | Lint `src` with oxlint                 |

## Project layout

- **`src/App.tsx`** — creates the router and registers its types.
- **`src/Document.tsx`** — the HTML document shell.
- **`src/routes/`** — your pages; the route tree is generated.
- **`src/components/`** — reusable, tested UI pieces.
- **`src/App.css`** — the one place styling is configured (Tailwind + daisyUI).

For the full file-by-file reference, see [`docs/project-structures.md`](docs/project-structures.md).
For a practical usage guide (styling, routing, components), see [`docs/basic.md`](docs/basic.md).

## Styling

Styling is centralized in `src/App.css`:

```css
@import "tailwindcss";
@plugin "daisyui";
```

Tailwind v4 has no `tailwind.config.js` — configuration lives in CSS. daisyUI 5
is loaded as a plugin and provides themeable components (`btn`, `card`,
`navbar`, `table`, …) switched via the `data-theme` attribute. When writing
JSX/HTML, prefer daisyUI utility classes over hand-rolled CSS.

## Deployment

```bash
bun build
```

Deploy the **`dist/client`** folder to any static host. There are no server
dependencies.

## Learn more

- [Solid Website](https://solidjs.com)
- [Solid Discord](https://discord.com/invite/solidjs)
- [TanStack Router](https://tanstack.com/router)
- [daisyUI](https://daisyui.com)

This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli).
