---
name: responsive
description: Mobile-first responsive conventions for solid-admin. Read before building or changing any layout/UI that must adapt across screen sizes. Applies when the feature is capable of responsive behavior.
---

# Mobile-First Responsive Layout

solid-admin is an **admin web**. Responsive/mobile support is applied
**mobile-first** whenever a feature is capable of adapting — but not every dense
admin surface is worth a mobile treatment. Apply these conventions when the
feature is a good candidate; do not force RWD onto controls that genuinely
require desktop width (e.g. deep data-grid editing).

## Core principle

- **Mobile is the base, desktop is the enhancement.** Write the base CSS for the
  smallest screen first, then use Tailwind breakpoint prefixes (`sm:`, `md:`,
  `lg:`) to enhance larger screens. Do the opposite rarely and only with a reason.
- Prefer **daisyUI components** first (per the daisyUI skill); reach for Tailwind
  utilities for custom responsive layout. When using `flex`/`grid`, add
  responsive prefixes (daisyUI usage rule 5).

## Breakpoints (Tailwind defaults)

| Prefix | Min width | Intent in this app |
|--------|-----------|--------------------|
| *(none)* | 0 | Mobile baseline — single column, collapsed chrome |
| `sm:` | 640px | Stats become horizontal, denser rows |
| `md:` | 768px | Mid-size (tablets) tweaks |
| `lg:` | 1024px | Drawer opens, hamburger hidden, sidebar visible |

## Patterns in this codebase (match these)

- **Sidebar / navigation collapse:** `AppShell.tsx` uses a daisyUI `drawer` with
  `lg:drawer-open` — the sidebar is a slide-over drawer on mobile and a fixed
  panel on `lg`+. `Navbar.tsx` hides its drawer-toggle behind `lg:hidden` (only
  shown on small screens).
- **Stat groups:** `index.tsx` uses `sm:stats-horizontal` so stat cards sit
  vertically on mobile and go side-by-side from `sm` up.
- **Page padding/content:** use responsive utilities so content breathes on
  mobile (`px-4 lg:px-8`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).

## Rules

1. **Base = mobile.** A layout must make sense at 360px wide before you add a
   single breakpoint. If it cannot (core admin function), flag it rather than
   producing a broken compromise.
2. **Expand upward with prefixes.** Use `sm:`/`md:`/`lg:` to add complexity at
   larger widths. Keep the default (no-prefix) rules minimal and mobile-safe.
3. **Dense tables:** on small screens prefer horizontal scroll
   (`overflow-x-auto`) over shrinking columns to unreadable widths; where a row's
   content fits a `card` better, consider a card list at the mobile breakpoint.
4. **Touch targets:** interactive elements ≥ 44px (daisyUI `btn-*` sizes already
   meet this; keep custom controls similarly sized).
5. **No horizontal squeeze:** avoid fixed widths; use fluid layouts
   (`w-full`, `max-w-*`, `grid`/`flex` with wrapping).
6. **Preserve existing breakpoints:** do not regress the current `lg:drawer-open` /
   `lg:hidden` / `sm:stats-horizontal` behavior when touching layout.

## When NOT to force responsive

If a control's mobile UX would be worse than hiding/overflowing it, keep it
desktop-first and document the decision. Being "capable" means the feature
degrades gracefully — if it cannot, prefer a clean desktop layout over a broken
mobile one (YAGNI: don't ship half-working RWD).

## Verification

- Build and visually confirm at `360px` (mobile), `768px` (tablet), `1280px` (desktop).
- Ensure no horizontal page scroll caused by a fixed-width element.
- Confirm nested interactions (drawer, tables) remain usable at each width.
