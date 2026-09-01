# @openclaw/acpx

Official ACP runtime backend for PASO.

ACPx lets PASO run external coding harnesses through the Agent Client Protocol while PASO still owns sessions, channels, delivery, permissions, and Gateway state.

## Install

```bash
openclaw plugins install @openclaw/acpx
```

Restart the Gateway after installing or updating the plugin.

## What it provides

- ACP-backed agent runtime sessions.
- Plugin-owned session and transport management.
- MCP bridge helpers for PASO tools and plugin tools.
- Static runtime assets used by the ACP process bridge.

## Configure

Use the ACP docs for harness-specific setup, permission modes, and model/runtime selection:

- https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/tools/acp-agents-setup.md
- https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/tools/acp-agents.md

## Package

- Plugin id: `acpx`
- Package: `@openclaw/acpx`
- Minimum PASO host: `2026.4.25`
