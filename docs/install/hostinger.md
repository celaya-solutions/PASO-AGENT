---
summary: "Host PASO on a Hostinger VPS"
read_when:
  - Setting up PASO on a Hostinger VPS
  - Choosing a VPS for a PASO source deployment
title: "Hostinger"
---

Run a persistent PASO Gateway on a Hostinger VPS that you administer.

<Warning>
Hostinger pages or one-click images branded OpenClaw are upstream framework
offerings, not PASO releases and not managed by Celaya Solutions Research. To
run PASO, deploy an image built from the
[PASO source repository](https://github.com/celaya-solutions/PASO-AGENT).
</Warning>

## Prerequisites

- A Hostinger VPS running a current Debian or Ubuntu release
- SSH access with permission to install Docker
- At least one supported model-provider credential
- A private firewall rule that exposes SSH but not the Gateway directly to the
  public Internet

## Install

1. Provision the VPS in Hostinger's control panel and record its public IP.
2. Connect over SSH.
3. Follow the [Docker VM runtime](/install/docker-vm-runtime) guide to clone the
   PASO fork, build its image, create persistent state, and start the Gateway.
4. Open an SSH tunnel from your computer:

   ```bash
   ssh -N -L 18789:127.0.0.1:18789 <user>@<vps-ip>
   ```

5. Open `http://127.0.0.1:18789/` and enter the Gateway token created during
   setup.

Keep the Gateway port private. If you later add a public reverse proxy, require
Gateway authentication, terminate TLS, and configure the exact trusted proxy
and Control UI origins.

## Updates and backups

Use the source-based update and backup steps in the
[Docker VM runtime](/install/docker-vm-runtime#update-paso) guide. A Hostinger
control-panel image update can replace the source or release channel you
reviewed, so do not use it as a PASO update mechanism unless it points to an
image you built from this fork.

## Troubleshooting

- If the dashboard does not load, confirm the container is healthy and that
  the SSH tunnel is still running.
- If the container restarts, inspect its logs for missing credentials or an
  invalid Gateway configuration.
- If a channel sends a pairing code, approve it from the PASO dashboard or use
  `openclaw pairing approve <channel> <CODE>` on the VPS.

## Related

- [Docker VM runtime](/install/docker-vm-runtime)
- [Gateway security](/gateway/security)
- [Channels](/channels)
