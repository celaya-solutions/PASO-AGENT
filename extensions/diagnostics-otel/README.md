# @openclaw/diagnostics-otel

Official OpenTelemetry diagnostics exporter for PASO.

This plugin exports PASO Gateway traces, metrics, and logs to an OTLP collector for observability stacks such as Grafana, Datadog, Honeycomb, New Relic, Tempo, and compatible collectors. It can also write diagnostic log records as stdout JSONL for container log pipelines.

## Install

```bash
openclaw plugins install @openclaw/diagnostics-otel
```

Restart the Gateway after installing or updating the plugin.

## Configure

Enable the plugin, set `diagnostics.otel.enabled` to `true`, and set the collector URL in `diagnostics.otel.endpoint`.

The full config surface, metric names, span names, and collector examples live in the docs:

- https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/gateway/opentelemetry.md

## Package

- Plugin id: `diagnostics-otel`
- Package: `@openclaw/diagnostics-otel`
- Minimum PASO host: `2026.4.25`
