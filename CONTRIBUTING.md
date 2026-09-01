# Contributing to PASO

PASO is an AI agent developed by Celaya Solutions Research in El Paso, Texas.
Thank you for helping make it safer, clearer, and more useful.

## Contact and project links

- Repository: https://github.com/celaya-solutions/PASO-AGENT
- Issues: https://github.com/celaya-solutions/PASO-AGENT/issues
- General contact: [hello@celayasolutions.com](mailto:hello@celayasolutions.com)
- Security reports: follow [SECURITY.md](SECURITY.md)

## Before opening an issue

Search existing issues first. Include the PASO version or commit, operating
system, model/provider route, expected behavior, actual behavior, and the
smallest repeatable example you can share safely. Remove credentials and private
data from logs and screenshots.

Use the repository issue chooser for bugs, documentation problems, and feature
requests. Security problems must use the private reporting path in
[SECURITY.md](SECURITY.md), not a public issue.

## Before opening a pull request

Keep each pull request focused on one problem. Explain:

1. What problem the change solves
2. Why this solution was chosen
3. What users will notice
4. How the change was verified

Large changes should start with an issue so the direction can be agreed before
implementation. Do not include secrets, real user data, or unrelated formatting
changes.

## Local development

Use Node.js 22.22.3+, 24.15+, or 25.9+. Node.js 26 is recommended.

```bash
git clone https://github.com/celaya-solutions/PASO-AGENT.git
cd PASO-AGENT
pnpm install
pnpm build
```

Run focused tests for the changed surface and use the repository's check
wrappers. The compatible command remains `openclaw`:

```bash
pnpm test <path-or-filter>
pnpm check:changed
pnpm openclaw --help
```

User-visible changes need proof from the real running surface. Include a clear
screenshot or short video when the change affects the Control UI or a companion
app.

## Compatibility naming

The product and agent name are **PASO**. Existing technical identifiers remain
lowercase `openclaw` for compatibility, including the CLI, package scopes,
environment variables, config names, and state paths. Do not mechanically
rename those contracts in a branding change.

## License and upstream work

Contributions are accepted under the repository's MIT license. PASO is based on
the OpenClaw framework, and the upstream license, notices, and contributor credit
must remain intact.
