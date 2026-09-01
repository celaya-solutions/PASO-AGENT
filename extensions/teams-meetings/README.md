# @openclaw/teams-meetings

Official Microsoft Teams browser meeting participant plugin for PASO.

This plugin registers the `teams_meetings` tool so agents can join Microsoft
Teams meetings as a Chrome browser guest.

## Install

```bash
openclaw plugins install @openclaw/teams-meetings
```

Restart the Gateway after installing or updating the plugin.

## Configure

Follow the Teams meetings guide for Chrome profiles, paired nodes, audio
routing, and guest join setup:

- https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/plugins/teams-meetings.md

## Package

- Plugin id: `teams-meetings`
- Tool: `teams_meetings`
- Package: `@openclaw/teams-meetings`
- Minimum PASO host: `2026.7.2`
