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

## Contributing with AI or AI agents

Contributions made with the help of AI assistants or autonomous AI agents are
welcome, but they are treated exactly like any other contribution and must
follow the same rules. An AI's output is a starting point, not a substitute for
your own judgment or the review process.

### If you drive an AI assistant

You prompt the AI and review what it produces. This is the recommended way to
use AI in this project.

1. **Point it at the rules.** Have the AI read [`AGENTS.md`](AGENTS.md) first.
   It contains mandatory conventions (daisyUI-first styling, the
   `lib/api → hooks → routes` data layering, static-only build, and English-only
   content) that the AI must follow.
2. **Scope the task.** Give the AI a single, well-defined change. Do not ask for
   broad rewrites or unrequested "improvements".
3. **Require a plan for non-trivial work.** For anything larger than a small
   fix, ask the AI to present a plan and wait for your approval before it edits
   files.

### If you run an autonomous AI agent

An autonomous agent acts on your behalf with little or no per-step prompting.
Treat its work with the same care as your own:

- **Start from a written brief.** Define the goal, scope, and any explicit
  boundaries before the agent runs. Vague instructions produce large, hard-to-review
  diffs.
- **Keep permissions tight.** Do not grant the agent write, commit, or push
  access beyond what the task needs. For sensitive or destructive operations
  (deleting files, force-pushing, rewriting history), require explicit approval
  instead of letting the agent decide.
- **Inspect before you accept.** Read the agent's full diff and reasoning before
  committing. If you cannot explain a change, do not merge it.
- **Watch for scope creep.** Reject unrelated edits, "helpful" refactors, and
  changes to files outside the task. Ask the agent to revert anything that was
  not requested.

### Submitting AI-assisted work

- **Review every change yourself.** You are responsible for the code you submit.
  Never merge AI output you have not read and verified.
- **Keep the diff focused.** Strip out unrelated edits, regenerated noise, and
  scratch files. Stage only the files relevant to the task.
- **Run the checks.** Confirm `bun lint`, `bun test`, and `bun build` pass
  before opening a pull request, and fix anything the AI introduced.
- **Update the changelogs correctly.** Use [`CHANGELOG.md`](CHANGELOG.md) for
  user-visible changes and [`knowledge/changelog.md`](knowledge/changelog.md)
  for internal, engineering-level detail — see [`AGENTS.md`](AGENTS.md) for the
  distinction.
- **Follow the commit rules.** Use clear, imperative messages and keep the
  co-author trailer if the AI produced the change (see [Commit
  messages](#commit-messages)).

Do not use AI output to bypass review, tests, or the Code of Conduct.

## Questions

If you are unsure about anything, open an issue or start a discussion rather
than guessing.
