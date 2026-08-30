---
name: theming
description: Conventions for the theme system in solid-admin — custom daisyUI themes, semantic color tokens in src/App.css, and the card surface. Read before writing or changing theme/color/styling code.
---

# Theming & Color Tokens

This skill documents how theming works in solid-admin so color and surface
decisions stay consistent and theme-aware (D-007). All theming is centralized
in **`src/App.css`** (recorded decision D-004).

The system has three parts:

1. **Custom daisyUI themes** (light `admin` + dark `admin-dark`).
2. **Semantic tokens** aliasing daisyUI's theme variables.
3. **Surface styles** (`card`, etc.) consuming those tokens.

## Where things live

- `src/App.css` is the **only** place themes, tokens, and surface styles are defined.
- Utility markup uses **daisyUI class names** (`bg-base-100`, `card`, `btn`) in
  components; semantic tokens are for custom CSS that needs readable names.

## Custom daisyUI themes

Defined via `@plugin "daisyui/theme"` (per the daisyUI colors/conventions):

- `admin` — light, `default: true`.
- `admin-dark` — dark.

Each theme block must set **all** required variables: `--color-base-100/200/300`,
`--color-base-content`, `--color-primary(/-content)`, `--color-secondary(/-content)`,
`--color-accent(/-content)`, `--color-neutral(/-content)`, `--color-info(/-content)`,
`--color-success(/-content)`, `--color-warning(/-content)`, `--color-error(/-content)`,
plus `--radius-selector/field/box`, `--size-selector/field`, `--border`, `--depth`,
`--noise`. Use OKLCH. Set `color-scheme` to `light`/`dark` for browser UI.

**Activation is explicit.** In this daisyUI version the theme is applied by
`data-theme` on the root — it does **not** auto-switch via a
`prefers-color-scheme` media query (the `prefersdark` option does not emit one
here). The app handles this at runtime:

- `src/Document.tsx` renders `<html data-theme="admin">` as the initial shell.
- `src/lib/theme.ts` resolves `admin` vs `admin-dark` from a `localStorage`
  override (`theme` = `light` | `dark`) else `prefers-color-scheme`, sets
  `document.documentElement.dataset.theme`, and `watchSystemTheme()` keeps it in
  sync with OS changes.
- `src/App.tsx` calls `applyTheme()` + `watchSystemTheme()` in `onSettled`.

So set `data-theme="admin"`/`"admin-dark"` to switch themes; reuse
`src/lib/theme.ts` rather than re-implementing resolution.

## Semantic tokens

Friendly aliases over the daisyUI variables, defined on `:root`/`[data-theme="admin"]`
(light) and `[data-theme="admin-dark"]` (dark):

| Token | Maps to | Use for |
|-------|---------|---------|
| `--background` | `--color-base-100` | Page background |
| `--foreground` | `--color-base-content` | Default text color |
| `--card` | `--color-base-200` | Card/surface background |
| `--card-foreground` | `--color-base-content` | Text on cards |
| `--muted` | `--color-base-200` | Muted surfaces |
| `--muted-foreground` | base-content @ 60% (`color-mix`) | Secondary/muted text |
| `--border` | `--color-base-300` | Borders/dividers |
| `--radius` | `--radius-box` | Card/box radius |
| `--primary(/-foreground)` | daisyUI primary | Brand emphasis |
| `--secondary(/-foreground)`, `--accent(/-foreground)` | daisyUI | Alternatives |
| `--info/success/warning/error(/-foreground)` | daisyUI | Status messages |

**Rules:**

- Prefer these tokens in custom CSS over hard-coded colors so values follow the theme.
- For alpha/muted colors, use `color-mix(in oklab, var(--color-base-content) 60%, transparent)`
  — do **not** write `var(--color-x / 60%)` (invalid inside `var()`).
- Prefer daisyUI utility classes (`bg-base-100`, `text-base-content`) in markup
  over raw tokens where they express the same intent (simpler and theme-safe).

## Card surface

The `.card` rule (in `@layer components`) is the project's surface style:

```css
@layer components {
  .card {
    background-color: var(--card);
    color: var(--card-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
}
```

It complements (not replaces) daisyUI's `card` utility. Because it sits in the
`components` layer, daisyUI **utility** classes (`bg-base-100`, `shadow`) still
win where present. When adding a new surface type (panel, toolbar, sidebar
section), follow this same pattern: derive from `--card`/`--foreground`/`--border`
and place it in `@layer components`.

## When to apply

- **Adding/changing colors:** edit the theme block(s) in `src/App.css` only.
- **New custom surface:** reuse the `.card` tokens; extend `@layer components`.
- **Adding a theme:** define a new `@plugin "daisyui/theme"` block with all
  required variables and mirror the semantic tokens for it.
- **In components:** use daisyUI classes; reach for tokens only in custom CSS.
