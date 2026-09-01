> ## How to write logs
>
> **Purpose** — This file is a permanent, auditable record of what changed in
> **solid-admin**. It lets anyone (human or agent) understand the project's
> evolution without reconstructing history from git or memory.
>
> **How to write**
> 1. Add a new entry at the **top** of the log. The newest entry is always first.
> 2. Group changes under `Added` / `Changed` / `Removed` / `Fixed` as appropriate,
>    with a short factual summary.
> 3. Be objective: state *what* changed and *why* when useful.
>
> **Append-only** — Entries are **add-only**. Do **not** edit or delete existing
> entries. If an entry is wrong or incomplete, add a new correcting entry instead
> of altering the old one. This keeps the history honest and tamper-evident.

---

# Changelog

Notable changes to the **solid-admin** project. Entries are in reverse
chronological order (newest at the top).

## [Unreleased]

### Added
- `LineChart` component (`src/components/ui/LineChart.tsx`) rendering a line
  chart in the dashboard Overview card via Chart.js mounted directly on a
  `<canvas>` ref (Solid 2 `onSettled`/`onCleanup`).
- `chart.js` dependency (framework-agnostic; no Solid wrapper package).

### Changed
- Dashboard Overview card now displays a revenue/sales line chart instead of
  placeholder text.

### Added
- Profiles API module (`src/lib/api/profiles.ts`) with `fetchUserProfile(id)`
  and `useUserProfile` hook for user profile data via TanStack Query.
- Accessibility improvements: mobile drawer now has `inert` and `aria-hidden`
  when closed; flyout menus have `role="menu"`, `role="menuitem"`,
  `aria-expanded`, `aria-haspopup="menu"`, and keyboard navigation (ArrowUp,
  ArrowDown, Escape).
- Test coverage: `Card.test.tsx`, `PageHeader.test.tsx`, `profiles.test.ts`,
  `Sidebar.test.tsx`.

### Fixed
- `.gitignore` now includes `.tanstack/` (router cache directory).

### Changed
- `users.$id.tsx` route now uses `useUserProfile` hook instead of direct fetch,
  matching the project's data-layer conventions (backend skill).
- Updated `responsive/SKILL.md` to document the current sidebar collapse/flyout
  patterns and accessibility attributes.
- Updated `plan.md` to reflect D-012 completion and pending test-coverage work.

### Added
- Sidebar submenus (D-012): `MenuItem` gains `children?: MenuItem[]` and the
  menu renders recursively. Parents become accordion toggles (expanded mode)
  with a rotating chevron and auto-open when the active route lives under them;
  in collapsed mode a parent icon opens a flyout panel to the right
  (`w-48`, `flex! flex-col!`, click-catcher overlay). Demo submenu under
  `Orders` → All Orders `/orders`, Pending `/orders/pending`, Completed
  `/orders/completed` (the two new placeholder pages reuse `PageHeader` +
  `Card`). Fixed two traps: parent `item` leaking through `{...props}` in the
  recursive render (children now get explicit props via `subMenuProps()`), and
  daisyUI `.menu` `display:grid` flow on the flyout (overridden with
  `flex! flex-col!`).

### Fixed
- Collapsed sidebar hover/highlight: 44px rounded highlight tiles now sit with
  symmetric 10px left/right gutters and the icon is dead-center both axes (icon
  center X = Y = 32px = shell center, verified by headless geometry capture).
  Root cause of the earlier 2px/6px offsets: (1) TanStack Router `Link`
  serializes a `class` **array** with commas, mangling `w-11!` etc., so the
  `class` prop is now a single string; (2) daisyUI `.menu` makes `li`
  `flex-direction: column`, so horizontal centering needs `align-items: center`
  (`items-center!`), not `justify-content`; (3) daisyUI `.menu` anchor styles
  had higher specificity than Tailwind utilities, so `flex! items-center!
  justify-center! w-11! h-11! p-0!` (`!important` modifiers) are used on the
  collapsed `Link`, with `w-full! flex! items-center! justify-center! px-2` on
  the `li`. Refines the earlier centering fix (this entry supersedes the
  mechanism described in the entry below).
- Collapsed sidebar centering: menu items are now perfectly centered in the
  `w-16` strip (shell center = 32px, icon center = 32px, verified by headless
  geometry capture). The wrapper `ul` is `w-full items-center` with `p-0` and
  each `li` is `w-full flex justify-center`, so the full-width rounded
  highlight no longer sits off-center. Brand logo bumped to `w-10 h-10` to
  match the 44px menu tiles.
- Solid 2 context API: changed `<LayoutContext.Provider value={...}>` to
  `<LayoutContext value={...}>` in `layout-context.tsx`. In Solid 2,
  `createContext()` returns the provider function directly (no `.Provider`
  property), so the old form compiled to `createComponent(undefined)` →
  "Comp is not a function" on every route in production builds. Verified by
  headless Chrome capture on all routes with no errors. See D-010.

### Changed
- Visual polish (D-011): sidebar `border-r` → `shadow-sm`; navbar `border-b`
  → `shadow-sm`; active menu `bg-primary` → `bg-primary/10` (softer tint);
  search input `bg-base-200` added; cards/stats `shadow` → `shadow-sm`;
  dropdown `shadow-lg` added; brand logo `shadow-sm` added. All CSS/Tailwind
  class edits only, no structural changes.

### Added
- Reusable admin layout made standard-panel-like: `src/components/layout/`
  gains `layout-context.tsx` (`LayoutProvider`/`useLayout`) and `menu.tsx`
  (single `menuItems` config + inline SVG icon set). `Sidebar` now has a brand
  block, an icon menu (Dashboard, Users, Orders, Analytics, Settings), and an
  icon-only desktop collapse (`w-16`) with a `forceFull` mode for the mobile
  drawer. `Navbar` got a mobile-drawer toggle + desktop-collapse toggle plus a
  consistent right side (search, notifications, user dropdown). `AppShell`
  renders the collapsible desktop sidebar and a mobile slide-over drawer and no
  longer takes a `sidebar` prop.
- Placeholder routes `orders`, `analytics`, `settings` reusing
  `PageHeader` + `Card` as named menu destinations.

### Changed
- `src/routes/__root.tsx` — removed the now-internal `Sidebar` import; content
  area scrolls independently under a sticky `Navbar`.

### Deprecated / Noted
- A transient `createComponent` HMR error appeared during the multi-file layout
  creation but does not occur in the final, consistent state (verified by
  `vite build` and route-render tests). See D-009.

### Added
- `.opencode/skills/responsive/SKILL.md` — mobile-first responsive conventions
  (Tailwind breakpoint prefixes, drawer/sidebar collapse, dense tables; applies
  when a feature is capable of RWD, not forced onto non-capable admin surfaces).
- Theme applied to the admin app: new `src/lib/theme.ts` resolves `admin` vs
  `admin-dark` from a `localStorage` override else `prefers-color-scheme`, and
  sets `data-theme` on `<html>`; `src/App.tsx` calls `applyTheme()` +
  `watchSystemTheme()` in `onSettled`; `src/Document.tsx` initial shell now
  uses `data-theme="admin"`. (daisyUI here does not auto-switch dark, so the
  theme must be set at runtime.)
- Skills made consistent with the installed TanStack Query RC (see Changed below):
  new `.opencode/skills/theming/SKILL.md` documenting D-007 theme tokens/surfaces.
- Theming in `src/App.css`: custom daisyUI themes `admin` (light, default) and
  `admin-dark` (dark, prefers-color-scheme) with all required `--color-*`,
  `--radius-*`, `--border`, `--depth`, `--noise` variables (indigo/blue primary).
- Semantic alias tokens on `:root`/`[data-theme="admin-dark"]`: `--background`,
  `--foreground`, `--card`, `--card-foreground`, `--muted(/-foreground)`,
  `--border`, `--primary(/-foreground)`, `--success(/-foreground)`, etc.
- Specialized `.card` style (`@layer components`) using `--card`, `--card-foreground`,
  `--border`, and `--radius` as a consistent surface.
- Backend/API organization: `src/lib/api/` fetch layer (`client.ts`, `users.ts`,
  `auth.ts`, `types.ts`), `lib/constants.ts`, `lib/utils.ts`, `lib/queries/keys.ts`
  (query key factory), and `src/hooks/` wrappers (`useUsers`, `useAuth`).
- `src/App.tsx` — wrapped the router in `QueryClientProvider`.
- Added `@tanstack/solid-query@6.0.0-rc.1` dependency (Solid 2 RC compatible;
  renamed APIs `useQuery`/`useMutation`).
- `.opencode/skills/backend/SKILL.md` — new skill defining the fetch ↓ query ↓
  route layering conventions.
- Component library under `src/components/`: `layout/` (AppShell, Navbar,
  Sidebar, PageHeader) and `ui/` (Card, StatCard, DataTable, EmptyState).
- Route files refactored to compose the new components; co-located tests for
  `StatCard` and `DataTable`.
- `.opencode/skills/general/SKILL.md` — added a Component Organization section.
- `docs/project-structures.md` — file-by-file reference of the project layout.
- `docs/basic.md` — practical getting-started guide (stack, styling, routing,
  components, deployment).
- `docs/pages/` — Jekyll site (GitHub Pages) built from `./docs/pages`.
- `.github/workflows/jekyll-gh-pages.yml` — now triggers on `release: published`
  and builds from `./docs/pages` instead of the repo root.
- `README.md` — rewritten in English to describe solid-admin.
- `.opencode/opencode.json` — opencode config; `git *` commands set to `ask`.
- `knowledge/` — project knowledge base (`plan.md`, `changelog.md`,
  `decision-log.md`).

### Changed
- `.opencode/skills/backend/SKILL.md` and `.opencode/skills/general/SKILL.md`:
  corrected Query API names to the installed RC (`createQuery`→`useQuery`,
  `createMutation`→`useMutation`) and fixed the `ApiResult` type reference in
  the client example to `ErrorResponse`, matching the actual code.
- `AGENTS.md` — project-skills list now includes the `backend` and `theming`
  skills.
- Moved the daisyUI agent skill from `.agents/skills/daisyui` to
  `.opencode/skills/daisyui` so opencode's native skill scanner picks it up.
- `AGENTS.md` — added the mandatory "Non-Negotiable Rules" section (High-Care,
  No Unauthorized Changes, No Over-Assumption, Never Reduce or Break Features,
  Planning Is Mandatory, Audit Means Report Only).

### Repository
- Initialized git, committed the project, and pushed `main` to
  `git@github.com:rachmanzz/solid-admin.git`.

## [Template baseline]

- Scaffolded from the Solid `with-tanstack-router` template (Solid 2.x + TanStack
  Router + Tailwind v4 + daisyUI 5).
- Static-only build contract (`dist/client` deployable anywhere).
