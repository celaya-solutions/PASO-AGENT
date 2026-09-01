# @openclaw/brave-plugin

Official Brave Search provider plugin for PASO.

This plugin registers Brave as a `web_search` provider. It supports normal Brave web search and Brave LLM Context API mode.

## Install

```bash
openclaw plugins install @openclaw/brave-plugin
```

Restart the Gateway after installing or updating the plugin.

## Configure

Store a Brave Search API key in plugin config or expose `BRAVE_API_KEY` to the Gateway:

```bash
openclaw config set plugins.entries.brave.enabled true
openclaw config set tools.web.search.provider brave
```

Provider-specific options live under `plugins.entries.brave.config.webSearch.*`.

## Docs

Full setup, config examples, search modes, and tool parameters:

- https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/tools/brave-search.md

## Package

- Plugin id: `brave`
- Package: `@openclaw/brave-plugin`
- Minimum PASO host: `2026.4.10`
