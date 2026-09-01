# @openclaw/comfy-provider

Official ComfyUI image, video, and music generation provider plugin for
PASO.

## Install

```bash
openclaw plugins install @openclaw/comfy-provider
openclaw gateway restart
```

## Configure

Local ComfyUI workflows do not require credentials. Comfy Cloud workflows use
`COMFY_API_KEY` or `COMFY_CLOUD_API_KEY`.

Full workflow, model, and provider configuration:

- https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/providers/comfy.md

## Package

- Plugin id: `comfy`
- Package: `@openclaw/comfy-provider`
- Minimum PASO host: `2026.7.2`
