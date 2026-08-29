---
title: Knowledge Base
layout: docs
---

# Knowledge Base

This page bundles the project's knowledge base: the **plan**, **changelog**, and
**decision log**. The canonical (append-only) source lives in `knowledge/` in the
repository.

---

## Plan

This document tracks the direction of **solid-admin** — a collection of admin
dashboard templates built on SolidJS 2.x.

### Current state

- SolidJS 2.x (RC) application scaffolded from the `with-tanstack-router` template.
- Routing via TanStack Router (`src/routes/`, generated `routeTree.gen.ts`).
- Styling via Tailwind CSS v4 + daisyUI 5, configured centrally in `src/App.css`.
- Static-only build (`vite build` → `dist/client`); no server runtime.
- Documentation: `docs/project-structures.md`, `docs/basic.md`, `README.md`, and a `knowledge/` base.
- Admin starter design: daisyUI drawer shell, dashboard, and users page.

### Short-term goals

- [x] Populate `knowledge/plan.md`, `knowledge/changelog.md`, `knowledge/decision-log.md`.
- [x] Build out admin screens (dashboard, users table) using daisyUI components.
- [ ] Ensure all components co-locate a Vitest test.
- [ ] Turn the `docs/` + `knowledge/` into a graphify knowledge graph.

### Medium-term goals

- [ ] Add a theme switcher using daisyUI `data-theme`.
- [ ] Add example data-loading patterns (loaders + `useLoaderData`) for tables.
- [ ] CI: lint + test + build on every push.
- [ ] Document deployment recipes for common static hosts.

### Non-goals (unless approved)

- SSR / server rendering (template is intentionally static).
- Backend or database coupling.
- Breaking changes to the existing routing/styling contracts.

---

## Changelog

Notable changes to the **solid-admin** project (newest at the top).

### Added

- `docs/project-structures.md` — file-by-file reference of the project layout.
- `docs/basic.md` — practical getting-started guide.
- `README.md` — rewritten in English to describe solid-admin.
- `.opencode/opencode.json` — opencode config; `git *` commands set to `ask`.
- `knowledge/` — project knowledge base (`plan.md`, `changelog.md`, `decision-log.md`).
- `docs/pages/` — Jekyll site published to GitHub Pages on release tags.
- Admin starter design: daisyUI `drawer` shell, dashboard, and `users.tsx` page.

### Changed

- Moved the daisyUI agent skill from `.agents/skills/daisyui` to `.opencode/skills/daisyui`.
- `AGENTS.md` — added the mandatory "Non-Negotiable Rules" section.
- Docs switched from `pnpm` to `bun`; removed `pnpm-lock.yaml`.

### Repository

- Initialized git, committed the project, and pushed `main` to `git@github.com:rachmanzz/solid-admin.git`.

### Template baseline

- Scaffolded from the Solid `with-tanstack-router` template (Solid 2.x + TanStack Router + Tailwind v4 + daisyUI 5).
- Static-only build contract (`dist/client` deployable anywhere).

---

## Decision Log

Recorded decisions (newest at the top), in Decision / Context / Consequence form.

### D-005: Static-only build contract

- **Decision:** Keep the build static; deploy `dist/client` to any static host.
- **Consequence:** No server dependencies. SSR remains out of scope unless the adapter's SSR utilities stabilize.

### D-004: Styling centralized in `src/App.css` via Tailwind v4 + daisyUI 5

- **Decision:** Configure Tailwind v4 (CSS-based config) with the daisyUI plugin in `src/App.css`, and prefer daisyUI utility classes over hand-rolled CSS.
- **Consequence:** Consistent, themeable UI with minimal custom CSS.

### D-003: Documentation language is English

- **Decision:** All docs (`README.md`, `docs/*`, `knowledge/*`) are written in English.
- **Consequence:** Consistent, searchable, contributor-friendly documentation.

### D-002: opencode config requires `git` to ask

- **Decision:** `.opencode/opencode.json` sets `permission.bash."git *": "ask"`.
- **Consequence:** Every git command prompts for approval.

### D-001: Skills live in `.opencode/skills/`, not `.agents/skills/`

- **Decision:** Move project agent skills into `.opencode/skills/`.
- **Consequence:** Skills are reliably loaded by opencode.
