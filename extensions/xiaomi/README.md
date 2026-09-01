# PASO Xiaomi Provider

Official PASO provider plugin for Xiaomi MiMo pay-as-you-go and Token Plan
models, usage tracking, and text-to-speech.

Install from PASO:

```bash
openclaw plugins install @openclaw/xiaomi-provider
openclaw gateway restart
```

Configure `XIAOMI_API_KEY` for `xiaomi/*` models and speech, or
`XIAOMI_TOKEN_PLAN_API_KEY` for `xiaomi-token-plan/*` models. See
https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/providers/xiaomi.md for regional Token Plan setup and
the full model and speech configuration.
