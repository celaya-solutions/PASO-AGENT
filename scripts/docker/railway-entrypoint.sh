#!/bin/sh
set -eu

prepare_writable_dir() {
  target_dir="$1"
  [ -n "$target_dir" ] || return 0
  mkdir -p "$target_dir"
  chown -R node:node "$target_dir"
}

if [ "$(id -u)" = "0" ]; then
  prepare_writable_dir "${OPENCLAW_STATE_DIR:-}"
  prepare_writable_dir "${OPENCLAW_WORKSPACE_DIR:-}"

  if [ -n "${RAILWAY_ENVIRONMENT_ID:-}" ] &&
    [ "$#" -eq 3 ] && [ "$1" = "node" ] && [ "$2" = "openclaw.mjs" ] && [ "$3" = "gateway" ]; then
    set -- "$@" --allow-unconfigured --bind lan --port "${OPENCLAW_GATEWAY_PORT:-8080}"
  fi

  exec gosu node "$@"
fi

exec "$@"
