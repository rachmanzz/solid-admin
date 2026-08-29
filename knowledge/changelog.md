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
- `docs/project-structures.md` — file-by-file reference of the project layout.
- `docs/basic.md` — practical getting-started guide (stack, styling, routing,
  components, deployment).
- `README.md` — rewritten in English to describe solid-admin.
- `.opencode/opencode.json` — opencode config; `git *` commands set to `ask`.
- `knowledge/` — project knowledge base (`plan.md`, `changelog.md`,
  `decision-log.md`).

### Changed
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
