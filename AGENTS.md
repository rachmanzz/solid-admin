# Agent Guide

These rules are MANDATORY for opencode and any AI agent operating in this
repository. Read this file before executing any command.

## Non-Negotiable Rules

- **High-Care Processing Standard** — Every task must be processed with the
  highest standard of care and caution. Double-check before acting.
- **No Unauthorized Changes** — Never destroy, delete, rearrange, or modify
  anything without explicit user approval. This includes files, directories,
  git history, and configuration.
- **No Over-Assumption** — Stay strictly focused on the user's request. Do NOT
  assume the user wants changes to other parts of the system beyond the
  explicit request. When in doubt, ask first.
- **No Assumption At All — Follow Instructions Literally** — The agent MUST NOT
  assume anything. NEVER add, remove, or "improve" anything the user did NOT
  explicitly ask for. Do NOT second-guess the user's instructions. Do NOT
  debate or argue with the user about what they asked for. Follow the user's
  exact instruction, exactly as given, with no additions, no "fixes", no
  "helpers", no creative interpretation. If an instruction is ambiguous or
  unclear, STOP and ask — do not guess. The user's word is final and is not
  open to discussion. Never override or overwrite what the user explicitly
  specified.
- **Never Reduce or Break Features** — Reducing existing features, causing
  features to stop working, or introducing regressions is STRICTLY FORBIDDEN.
  All changes must be backward-compatible and additive only, unless the user
  explicitly approves a breaking change.
- **Planning Is Mandatory Before Changes** — Planning MUST be done before
  starting any change. Present a plan (e.g., a todo list or a short written
  plan) to the user and get approval before executing any modification.
- **Audit Means Report Only** — When asked to audit, review, or analyze code,
  the agent MUST NOT edit files. Audit tasks produce reports only. Any changes
  identified during an audit require explicit user approval and a separate
  change request.
- **Use daisyUI Components** — All styling MUST use daisyUI component classes
  first (e.g. `btn`, `card`, `badge`, `list`, `avatar`, `table`). Only reach
  for raw Tailwind utilities when daisyUI has no applicable component, or when
  the user explicitly instructs otherwise. Read the daisyUI skill guides
  (`.opencode/skills/daisyui/`) before writing any styled HTML/JSX. Never
  invent custom styling patterns when a daisyUI component already exists.

## Language — English Only

- **Naming must be English.** All file names (`StatCard.tsx`), component names,
  function names, variable names, and comments/strings in code MUST be written
  in English. This includes identifiers, doc comments, and inline comments.
- **Written artifacts must be English.** Any update to docs, skills, agents,
  README, knowledge base, or other written material MUST be in English.
- **No other language allowed**, unless a feature is highly specific and has no
  adequate English counterpart for the naming (e.g. a domain term that only
  exists in another language). When in doubt, use English.
- **Converse accordingly.** User/agent conversation should also be in English
  unless the user writes otherwise.

This is a SolidJS 2.x project. Solid is not React: components run once (there is no re-render), reactivity is fine-grained through signals, and effects/memos have Solid-specific semantics. Do not port React patterns.

**This is NOT SolidStart.** It is a plain Vite + SolidJS setup using
`@solidjs/vite-plugin` with `solid({ start: true, ... })` in turnkey client
mode (see `vite.config.ts`), plus TanStack Router and TanStack Query. There is
no `@solidjs/start` dependency. Do not refer to this project as "SolidStart".
The `vite build` emits a `dist/server` chunk from the plugin's SSR/prerender
pass, but the app is client-rendered; browser-only code (e.g. DOM/chart
libraries) must be mounted in `onSettled` and guarded so it never runs on the
server.

## Reading documentation without assumption

- **Verify against the repo before labeling or acting.** Never describe the
  project's framework, runtime, or architecture from memory or surface clues
  (e.g. a `dist/server` chunk, an option named `start`). Confirm it against
  `package.json`, `vite.config.ts`, and `README.md` before writing it down.
- **Read documentation as written.** Do not guess the meaning of an option,
  export, or doc passage. If a term is ambiguous or your reading would change
  behavior, STOP and re-read or ask. Never substitute your interpretation for
  what the docs or the code actually say.
- **Do not record unverified claims.** A claim that is not grounded in the
  repo or its docs must not be written into code comments, the knowledge base,
  or conversation as fact.

## Knowledge base (`knowledge/`)

The `knowledge/` folder is the project's durable knowledge base. The agent MUST
consult it and keep it coherent:

- **Read before acting.** Before non-trivial work, check `knowledge/plan.md`
  (direction/roadmap) and `knowledge/decision-log.md` (prior decisions and their
  rationale). Respect recorded decisions; do not silently contradict them.
- **`plan.md` — living roadmap.** May be updated as priorities shift: add goals,
  mark `- [x]` when done, keep Non-goals accurate. Prefer editing existing
  entries over duplicating them.
- **`changelog.md` — append-only history.** Add new entries at the **top**;
  never edit or delete existing entries. If something was wrong, add a correcting
  entry. See its "How to write logs" guide.
- **`decision-log.md` — append-only decisions.** When a real decision is made or
  a prior one is superseded, add a new entry at the **top** using the
  Decision/Context/Consequence format; never alter or remove past entries.
- **When in doubt, record.** If a change implies a new direction or decision,
  propose a `decision-log.md` entry (subject to user approval per the rules
  above) rather than leaving rationale implicit.

## Project skills (in `.opencode/skills/` — read on demand)

The project ships agent skills that encode engineering conventions for this codebase:

- `.opencode/skills/general/SKILL.md` — core engineering principles (SRP, KISS, DRY, YAGNI, composition, separation of concerns, error handling, testing). Read this before creating, reviewing, or refactoring any non-trivial code. It defines *when* to split, *when* to extract, and the concrete patterns expected in this project.
- `.opencode/skills/backend/SKILL.md` — conventions for API/backend handling (fetch layer in `src/lib/api/`, TanStack Query hooks in `src/hooks/`, query keys, how routes consume data). Read before writing or refactoring any fetch/query/data code.
- `.opencode/skills/daisyui/SKILL.md` — daisyUI 5 component usage rules. Read before writing any styled HTML/JSX. Covers components, colors, themes, and the rule to always prefer daisyUI classes over custom Tailwind utilities.
- `.opencode/skills/theming/SKILL.md` — conventions for the theme system (custom daisyUI themes `admin`/`admin-dark`, semantic color tokens, card surface in `src/App.css`). Read before writing or changing theme/color/styling code.
- `.opencode/skills/responsive/SKILL.md` — mobile-first responsive conventions (Tailwind breakpoint prefixes, drawer/sidebar collapse, dense tables). Read before building or changing any layout that must adapt across screen sizes.

## Versioned skills (in node_modules — read on demand)

The installed packages ship agent skills that match their exact installed versions:

- `node_modules/solid-js/skills/reactivity-diagnostics/SKILL.md` — repair guide mapping every dev-mode diagnostic code (e.g. `REACTIVE_WRITE_IN_OWNED_SCOPE`, `STRICT_READ_UNTRACKED`) to its prescribed fix. Read it whenever a Solid diagnostic code appears in test output or the browser console.
- `node_modules/@solidjs/diagnostics/skills/agent-loops/SKILL.md` — how to capture reactive evidence (which scopes re-ran and why, wasted recomputes, cost tables) and assert budgets, in tests and against live pages.

## Reactive diagnostics — capture evidence instead of guessing

Use these whenever you are debugging reactivity (something doesn't update, updates too often, or is slow) or verifying a change didn't regress update granularity:

- **In tests:** `captureArtifact()` from `@solidjs/diagnostics` wraps a scenario and returns a serializable artifact of diagnostics + rerun attribution; matchers from `@solidjs/diagnostics/vitest` (`toHaveNoDiagnostics`, `toStayWithinRerunBudget`, `toHaveNoWaste`, …) assert on it. No browser needed.
- **Against the running dev server** (`diagnostics: true` in vite.config.ts; dev-only, no-op in builds). Requires an open page connected to the dev server (e.g. via a browser tool):
  - `GET /__solid/diagnostics` — status and connected client count
  - `POST /__solid/diagnostics` with JSON `{"method":"begin"}` then `{"method":"end"}` — capture a session into an artifact
  - `{"method":"whyDidRun","params":{"name":"<scope name>"}}` — recorded re-runs of one named scope in the open session
  - `{"method":"costs"}` — running cost tables for the open session

Name your signals/memos/effects (the `{ name: "..." }` option) — attribution reports scopes by name.
