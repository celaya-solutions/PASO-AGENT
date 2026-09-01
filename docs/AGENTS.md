# Docs Guide

This directory owns docs authoring, Mintlify link rules, and docs i18n policy.

## Docs Link Rules

- PASO docs are maintained in the fork's [`docs/` tree](https://github.com/celaya-solutions/PASO-AGENT/tree/main/docs). There is no separate PASO-owned docs domain.
- Internal doc links in `docs/**/*.md` must stay root-relative with no `.md` or `.mdx` suffix (example: `[Config](/gateway/configuration)`) so the existing docs renderer and local checks can resolve them.
- Section cross-references should use anchors on root-relative paths (example: `[Hooks](/gateway/configuration-reference#hooks)`).
- Doc headings should avoid em dashes and apostrophes because Mintlify anchor generation is brittle there.
- README and other GitHub-rendered docs should use absolute links to the PASO repository's `docs/` tree.
- Docs content must stay generic: no personal device names, hostnames, or local paths; use placeholders like `user@gateway-host`.

## Docs Content Rules

- For docs, UI copy, and picker lists, order services/providers alphabetically unless the section is explicitly describing runtime order or auto-detection order.
- Keep bundled plugin naming consistent with the repo-wide plugin terminology rules in the root `AGENTS.md`.
- JSON5/JSON config fences that look like whole `openclaw.json` documents are schema-validated in CI with `pnpm docs:check-config-examples`; deliberately partial or legacy snippets opt out with `validate=false` in the fence info string.
- Generated docs, never hand-edit: `docs/plugins/reference/**`, `docs/plugins/reference.md`, and `docs/plugins/plugin-inventory.md` come from `pnpm plugins:inventory:gen`; `docs/maturity/**` from `pnpm maturity:render`.
- The public and packaged docs map is generated from `pnpm docs:list --headings` during publishing and packaging. Keep only the small source stub at `docs/docs_map.md`; never commit the expanded heading mirror.

## Internal Docs

- Long-lived private operator docs belong in `~/Projects/manager/docs/`.
- Repo-local internal scratch/mirror docs may live under ignored `docs/internal/`.
- Never add `docs/internal/**` pages to `docs/docs.json` navigation or link them from public docs.
- Any packaging or publication step must exclude and prune `docs/internal/**` if a page is force-added later.
- Internal docs may mention repo paths, private app names, 1Password item names, and runbooks, but never include secret values.

## Maturity Scorecard Editing

`taxonomy.yaml` and `qa/maturity-scores.yaml` are the source inputs; generated maturity docs under `docs/maturity/` are projections and should not be hand-edited for score, LTS, taxonomy, QA profile, or evidence tables.
`scripts/qa/render-maturity-docs.ts` owns generation; use `pnpm maturity:render` to refresh committed docs and `pnpm maturity:check` to verify them.
`.github/workflows/maturity-scorecard.yml` renders artifact previews and can open generated-doc PRs; `.github/workflows/openclaw-release-checks.yml` dispatches it for release QA.
Keep deterministic `qa-evidence.json.scorecard` data in GitHub Actions artifacts unless a maintainer explicitly asks for a sanitized committed projection.
Human overrides must change source state in a PR and explain the reason plus public or redacted evidence.

## Docs i18n

- Foreign-language docs are not maintained in this repo. Keep generated localization output in a separate downstream checkout owned by PASO maintainers.
- Do not add or edit localized docs under `docs/<locale>/**` here.
- Treat English docs in this repo plus glossary files as the source of truth.
- Pipeline: update English docs here, update `docs/.i18n/glossary.<locale>.json` as needed, then run `scripts/docs-i18n` only in the downstream localization checkout.
- Before rerunning `scripts/docs-i18n`, add glossary entries for any new technical terms, page titles, or short nav labels that must stay in English or use a fixed translation.
- `pnpm docs:check-i18n-glossary` is the guard for changed English doc titles and short internal doc labels.
- Translation memory lives in generated `docs/.i18n/*.tm.jsonl` files in the publish repo.
- See `docs/.i18n/README.md`.
