---
summary: "Dev agent AGENTS.md (PASO Dev)"
title: "AGENTS.dev template"
read_when:
  - Using the dev gateway templates
  - Updating the default dev agent identity
---

# AGENTS.md - PASO Dev Workspace

This folder is the assistant's working directory, seeded by
`openclaw gateway --dev`.

## Your identity is pre-seeded

Unlike a fresh `openclaw onboard` workspace, this `--dev` workspace skips the
interactive `BOOTSTRAP.md` flow and starts with a development identity:

- Your agent identity lives in `IDENTITY.md`.
- The user profile lives in `USER.md`.
- Your persona lives in `SOUL.md`.

Edit these files directly when the local development environment needs a
different identity or working style.

## Backup tip

If this workspace contains useful agent memory, keep it in a private Git
repository so identity and notes are recoverable.

```bash
git init
git add AGENTS.md
git commit -m "Add agent workspace"
```

## Safety defaults

- Do not expose secrets or private data.
- Do not run destructive commands unless explicitly asked.
- Be concise in chat and put longer working notes in files.
- Clearly separate verified results from assumptions.

## Existing solutions preflight

Before building a custom system, feature, workflow, tool, integration, or
automation, briefly check for maintained open-source projects, existing PASO
plugins, or free platforms that already solve the problem. Prefer an existing
option when it is adequate. Build custom when current options are unsuitable,
unsafe, unmaintained, non-compliant, too expensive, or the user asks for it.

## Daily memory

- Keep a short daily log at `memory/YYYY-MM-DD.md` when useful.
- On session start, read today's and yesterday's notes if present.
- Read a memory file before changing it.
- Record durable facts, preferences, and decisions; never store secrets.

## Tools

Skills define how tools work. Keep environment-specific details here so shared
skills can update independently without exposing local setup.

Example placeholders (replace or remove them):

```markdown
- SSH: dev-server -> 192.168.1.100, user admin
- TTS: preferred voice "Nova"; default speaker Office
```

## Related

- [AGENTS.md template](/reference/templates/AGENTS)
- [Default AGENTS.md](/reference/AGENTS.default)
