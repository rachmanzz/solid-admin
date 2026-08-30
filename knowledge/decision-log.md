> ## How to write logs
>
> **Purpose** — This file is a permanent, auditable record of the decisions made
> for **solid-admin**. Each entry captures *what* was decided, *why* (context),
> and *what* follows from it (consequence), so rationale is never lost.
>
> **How to write**
> 1. Add a new entry at the **top** of the log. The newest decision is always first.
> 2. Use the ADR-style format: **Decision**, **Context**, **Consequence**.
> 3. Give the entry a stable identifier (e.g. `D-006`) and never reuse or renumber
>    past identifiers.
>
> **Append-only** — Entries are **add-only**. Do **not** edit or delete existing
> entries. If a decision is superseded, add a new entry that states the
> supersession. This preserves an honest, tamper-evident decision history.

---

# Decision Log

Recorded decisions for **solid-admin**, with their context and rationale. Each
entry follows the ADR-style format: **Decision**, **Context**, **Consequence**.
Newest decision is at the top.

## D-008: Runtime theme activation via `src/lib/theme.ts`

- **Context:** The custom daisyUI themes (`admin`/`admin-dark`) existed in
  `src/App.css` but were not applied — `src/Document.tsx` hardcoded
  `data-theme="light"`, and the installed daisyUI version does not auto-switch
  the dark theme via a `prefers-color-scheme` media query (`prefersdark` emits
  none), so `admin-dark` stayed inert.
- **Decision:** Activate themes explicitly at runtime: `src/lib/theme.ts`
  resolves `admin`/`admin-dark` from a `localStorage` override (`theme` =
  `light`|`dark`) else `prefers-color-scheme`, sets
  `document.documentElement.dataset.theme`, and `watchSystemTheme()` follows OS
  changes. `src/App.tsx` wires it in `onSettled`; `src/Document.tsx` uses
  `data-theme="admin"` as the initial shell.
- **Consequence:** Light default, dark follows the OS, with an optional
  persistent override. `onMount` was renamed `onSettled` in Solid 2 (used here).
  Theming skill updated to reflect explicit activation.

## D-007: Custom daisyUI themes with semantic tokens in `src/App.css`

- **Context:** The admin needs a consistent theming system — CSS variables for
  background/foreground/card and a distinct card surface — across light and
  dark modes, following daisyUI 5.
- **Decision:** Define two custom daisyUI themes via `@plugin "daisyui/theme"`
  (`admin` light default, `admin-dark` via `prefersdark`) carrying all required
  `--color-*`/`--radius-*`/`--border` variables, then alias them with friendly
  semantic names (`--background`, `--foreground`, `--card`, `--card-foreground`,
  `--muted`, `--border`, …) on `:root` and `[data-theme="admin-dark"]`. A `.card`
  `@layer components` style applies the card tokens as a consistent surface.
- **Consequence:** Components can read semantic tokens directly while daisyUI
  utility classes still work. The `.card` layer is additive (utilities win), so
  existing cards are not regressed. Dark mode follows the OS via
  `prefers-color-scheme`.

## D-006: Layered backend/API handling via TanStack Query

- **Context:** The admin app needs a consistent way to fetch, cache, and mutate
  data once a real backend exists. Patterns for where HTTP lives, where query
  logic lives, and how routes consume data were undefined.
- **Decision:** Adopt a strict `lib/api → hooks → routes` layering: a thin fetch
  layer in `src/lib/api/` (one function per endpoint, all delegating to a shared
  `request()` wrapper that normalizes errors), TanStack Query wrapper hooks in
  `src/hooks/` that own keys + invalidation via `lib/queries/keys.ts`, and thin
  routes that consume hooks only. Chose `@tanstack/solid-query@6.0.0-rc.1` (the
  only RC compatible with `solid-js 2.0.0-rc`; it uses `useQuery`/`useMutation`
  names, not the v5 `createQuery`/`createMutation`).
- **Consequence:** HTTP details live in one wrapper; caching/invalidation are
  keyed consistently; `components/ui` stays pure. No live endpoints are wired
  yet — `lib/api/*` and hooks are a compiling template to fill in as the backend
  materializes.

## D-005: Static-only build contract

- **Context:** The template ships client-mode (`start: true`, no SSR) and SSR is
  not wired for the third-party router.
- **Decision:** Keep the build static; deploy `dist/client` to any static host.
- **Consequence:** No server dependencies. SSR remains out of scope unless the
  adapter's SSR utilities stabilize.

## D-004: Styling is centralized in `src/App.css` via Tailwind v4 + daisyUI 5

- **Context:** Solid 2.x + TanStack template; daisyUI is already a dependency.
- **Decision:** Configure Tailwind v4 (CSS-based config) with the daisyUI plugin
  in `src/App.css`, and prefer daisyUI utility classes over hand-rolled CSS.
- **Consequence:** Consistent, themeable UI with minimal custom CSS. Existing
  demo components still use plain classes and should be migrated to daisyUI.

## D-003: Documentation language is English

- **Context:** The project targets a broad/technical audience and a public
  repository.
- **Decision:** All docs (`README.md`, `docs/*`, `knowledge/*`) are written in
  English.
- **Consequence:** Consistent, searchable, contributor-friendly documentation.

## D-002: opencode config requires `git` to ask

- **Context:** Pushing to a remote can destroy or publish work unintentionally.
- **Decision:** `.opencode/opencode.json` sets `permission.bash."git *": "ask"`.
- **Consequence:** Every git command prompts for approval. Other bash commands
  retain opencode's default `ask` behavior.

## D-001: Skills live in `.opencode/skills/`, not `.agents/skills/`

- **Context:** The daisyUI agent skill originally lived in
  `.agents/skills/daisyui`. The opencode skill loader reliably scans
  `.opencode/skills/**/SKILL.md`, while `.agents/skills/` is only a documented
  *global* (`~/.agents/skills`) auto-load path — a project-local copy is not
  guaranteed to be picked up.
- **Decision:** Move project agent skills into `.opencode/skills/`.
- **Consequence:** Skills are reliably loaded by opencode. `.agents/` is removed
  when empty. If cross-tool sharing (e.g. Claude Code) is later desired, a
  symlink or `skills.paths` entry can re-expose them.
