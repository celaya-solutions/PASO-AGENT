# @openclaw/pixverse-provider

Official PixVerse video generation provider plugin for PASO.

This plugin registers PixVerse as a `video_generate` provider for text-to-video and image-to-video workflows.

## Install

```bash
openclaw plugins install @openclaw/pixverse-provider
```

Restart the Gateway after installing or updating the plugin.

## Configure

Store your PixVerse API key in PASO config or expose the supported environment variable to the Gateway. Then select PixVerse as a video generation provider.

Full setup and model/provider examples:

- https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/providers/pixverse.md

## Package

- Plugin id: `pixverse`
- Package: `@openclaw/pixverse-provider`
- Minimum PASO host: `2026.5.26`
