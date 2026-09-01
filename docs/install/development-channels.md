---
summary: "Stable, extended-stable, beta, and dev channels: semantics, switching, pinning, and tagging"
read_when:
  - You want to switch between stable/extended-stable/beta/dev
  - You want to pin a specific version, tag, or SHA
  - You are tagging or publishing prereleases
title: "Release channels"
sidebarTitle: "Release Channels"
---

PASO source releases use the verified Celaya Solutions Research git origin:

- **stable**: the latest stable PASO git tag. Recommended for most users.
- **beta**: the latest PASO beta git tag, falling back to the latest stable tag
  when beta is missing or older.
- **dev**: the moving head of PASO's `main` branch. It may contain incomplete
  features or breaking changes; do not run it for production gateways.
- **extended-stable**: not available for PASO source checkouts.

Existing npm, pnpm, or Bun installations of the lowercase `openclaw` package
remain supported as upstream framework compatibility installs. On those
installs, stable, extended-stable, and beta select the upstream npm dist-tags
`latest`, `extended-stable`, and `beta`. Those package releases are not PASO
releases and are not published by Celaya Solutions Research. Selecting `dev`
migrates a package install to the PASO source checkout.

## Switching channels

```bash
openclaw update --channel stable
openclaw update --channel extended-stable
openclaw update --channel beta
openclaw update --channel dev
```

`--channel` persists the choice to `update.channel` in config and drives both
install paths:

| Channel           | Upstream compatibility package install                                                        | PASO git install                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `stable`          | upstream npm dist-tag `latest`                                                                | latest stable PASO git tag (excluding named prerelease suffixes)                                   |
| `extended-stable` | verifies and installs the exact upstream npm `extended-stable` selection, with no fallback    | unsupported; leaves the PASO checkout unchanged                                                    |
| `beta`            | upstream npm dist-tag `beta`, falling back to upstream `latest` when beta is missing or older | latest PASO beta git tag, falling back to the latest stable PASO tag when beta is missing or older |
| `dev`             | migrates to a PASO git checkout, builds it, and reinstalls the global CLI                     | fetches and rebases on the verified PASO `origin/main`, builds, and reinstalls the global CLI      |

For `dev` git installs, the default checkout is `~/openclaw` (or
`$OPENCLAW_HOME/openclaw` when `OPENCLAW_HOME` is set); override with
`OPENCLAW_GIT_DIR`.
Automatic PASO source-update campaigns pin the fork commit they announce, so the
displayed list previews up to five commits from the exact target installed even
if `main` advances during the countdown. A manual
`openclaw update --channel dev` still targets the current verified PASO
`origin/main`.

<Tip>
To keep stable and dev in parallel, use two separate checkouts and point each gateway at its own.
</Tip>

## One-off version or tag targeting

On an upstream compatibility package install, use `--tag` to target a specific
npm dist-tag, version, or package spec for one update **without** changing the
persisted channel. `--tag` does not select PASO git releases.

```bash
# Install a specific upstream package version
openclaw update --tag 2026.4.1-beta.1

# Install from the upstream beta dist-tag (one-off, does not persist)
openclaw update --tag beta

# Switch to the moving GitHub main checkout (persistent)
openclaw update --channel dev

# Install a specific npm package spec
openclaw update --tag openclaw@2026.4.1-beta.1

```

Notes:

- `--tag` applies to **upstream compatibility package installs only**; PASO git
  installs ignore it.
- The tag is not persisted; the next `openclaw update` uses the configured
  channel.
- A package install with stored `update.channel: "dev"` still honors a one-off
  `--tag` without switching to Git. An explicit `--channel dev` takes precedence
  over `--tag` and selects the Git checkout flow.
- The `--tag main` shorthand is rejected for package installs because the
  workspace checkout is not a self-contained package artifact. Use
  `openclaw update --channel dev` (package installs switch to a git checkout)
  or reinstall with the installer's git method:
  `curl -fsSL https://raw.githubusercontent.com/celaya-solutions/PASO-AGENT/main/scripts/install.sh | bash -s -- --install-method git --version main`.
- Downgrade protection: if the target version is older than the current
  version, PASO prompts for confirmation (skip with `--yes`).
- Extended-stable always uses its verified exact upstream package target. It
  is not a one-off alias for `--tag extended-stable`, and `--tag` cannot be
  combined with an effective extended-stable channel.
- On a compatibility package install, the `--channel beta` selector differs
  from one-off `--tag beta`: the channel flow can fall back to upstream stable/latest when beta is
  missing or older, while `--tag beta` always targets the raw upstream `beta`
  dist-tag for that one run. On a PASO source checkout, `--channel beta` stays
  on git and selects a PASO tag.

## Dry run

Preview what `openclaw update` would do without making changes:

```bash
openclaw update --dry-run
openclaw update --channel beta --dry-run
openclaw update --tag 2026.4.1-beta.1 --dry-run
openclaw update --dry-run --json
```

The dry run reports the effective channel, target version, planned actions,
and whether a downgrade confirmation would be required.

## Plugins and channels

Switching channels with `openclaw update` also syncs plugin sources:

- `dev` switches installed plugins that have a bundled counterpart back to
  their bundled (git checkout) source.
- `stable` and `beta` restore npm-installed or external-catalog-installed plugin
  packages.
- `extended-stable` resolves eligible upstream framework npm plugins with
  bare/default or `latest` intent to the exact installed core version. It does not query
  plugin `@extended-stable` tags at runtime. Version-bound runtime plugins use
  the base release cohort for correction versions (for example, `YYYY.M.P-2`
  uses plugin `YYYY.M.P`).
- npm-installed plugins are updated after the core update completes.

## Checking current status

```bash
openclaw update status
```

Shows the active channel (with the source that decided it: config, git tag,
git branch, installed version, or default), install kind (git or package),
current version, and update availability.

## Tagging best practices

- Tag releases you want git checkouts to land on: `vYYYY.M.PATCH` for stable,
  `vYYYY.M.PATCH-beta.N` for beta. Named prerelease suffixes such as
  `-alpha.N`, `-rc.N`, and `-next.N` are not stable or beta targets.
- Legacy numeric stable tags such as `vYYYY.M.PATCH-1` and `v1.0.1-1` are still
  recognized as stable git tags for compatibility.
- `vYYYY.M.PATCH.beta.N` (dot-separated) is also recognized for compatibility;
  prefer `-beta.N`.
- Keep tags immutable: never move or reuse a tag.
- Upstream npm dist-tags remain the source of truth for compatibility package installs:
  - `latest` -> stable
  - `extended-stable` -> trailing supported-month package release
  - `beta` -> candidate build or beta-first stable build
  - `dev` -> main snapshot (optional)

## macOS app availability

Beta and dev builds may **not** include a macOS app release. That is fine:

- The PASO git tag can publish without a matching native app build.
- Call out "no macOS build for this beta" in release notes or changelog.

## Related

- [Updating](/install/updating)
- [Installer internals](/install/installer)
