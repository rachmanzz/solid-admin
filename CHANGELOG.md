# Changelog

All notable changes to **solid-admin** are documented in this file.

This is the **public, user-facing changelog** for the template. It describes
releases and changes that affect people using or extending the template.

> **Note on scope.** This file is deliberately separate from the internal
> [`knowledge/changelog.md`](knowledge/changelog.md), which is an
> append-only, agent-facing development log used by the project's knowledge
> base. See [AGENTS.md](AGENTS.md) for the full distinction.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and this root
  `CHANGELOG.md` for public repository documentation.
- CI workflow that runs `lint` and `test` on every push and pull request.

### Changed

- Package renamed from `example-with-tanstack-router` to `solid-admin`.

### Fixed

- Unified the demo data layer on the static `public/users.json` manifest so the
  Users list and the user detail page show the same data.

[Unreleased]: https://github.com/rachmanzz/solid-admin/compare/v0.1.0-1...HEAD
