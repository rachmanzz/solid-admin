# Contributing to solid-admin

Thanks for taking the time to contribute. This document explains how to report
issues, propose changes, and get your work merged.

## Code of Conduct

All participation in this project is governed by the
[Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Before you start

- Search the existing [issues](https://github.com/rachmanzz/solid-admin/issues)
  to avoid duplicating work.
- For anything larger than a small fix, open an issue first and describe the
  problem and your proposed approach so we can agree on direction before you
  invest time.
- This project is an **admin template**, not a full application. Keep changes
  aligned with that scope: reusable admin UI, routing, styling, and data-layer
  patterns. Large new features should be discussed first.

## Development setup

solid-admin uses [Bun](https://bun.sh) as its package manager.

```bash
bun install   # install dependencies
bun dev       # start the dev server at http://localhost:3000
```

Useful scripts:

| Script        | What it does                                  |
| ------------- | --------------------------------------------- |
| `bun dev`     | Start the Vite dev server                     |
| `bun build`   | Build the static site to `dist/client`        |
| `bun serve`   | Preview the production build locally          |
| `bun test`    | Run the Vitest suite                          |
| `bun lint`    | Lint `src` with oxlint                        |

## Conventions

Read [`AGENTS.md`](AGENTS.md) before writing code. The key rules are:

- **Use daisyUI components first.** Prefer `btn`, `card`, `badge`, `list`,
  `table`, and other daisyUI classes over hand-rolled Tailwind utilities.
- **Follow the data-layer layering.** `src/lib/api` owns HTTP, `src/hooks` owns
  TanStack Query wrappers, and routes consume hooks only.
- **Keep the build static.** The project is intentionally static-only (no SSR,
  no backend). Browser-only code must be mounted in `onSettled` and guarded so
  it never runs on the server.
- **Write in English.** All code, comments, and docs are written in English.

## Making a change

1. Create a branch from `main`.
2. Make your change, keeping it focused on a single problem.
3. Add or update tests for any behavior you change.
4. Run the checks:

   ```bash
   bun lint
   bun test
   bun build
   ```

5. Update [`CHANGELOG.md`](CHANGELOG.md) under the `Unreleased` section, and
   update documentation if your change affects how the template is used.

## Commit messages

Write clear, imperative commit messages (e.g. "Add theme switcher", "Fix
sidebar flyout keyboard navigation"). Keep the first line under ~72 characters
and add a short body when the *why* is not obvious from the diff.

## Pull requests

- Reference the issue you are addressing, if there is one.
- Keep the diff as small as possible and focused on one change.
- Make sure lint, tests, and build pass in CI.

## Questions

If you are unsure about anything, open an issue or start a discussion rather
than guessing.
