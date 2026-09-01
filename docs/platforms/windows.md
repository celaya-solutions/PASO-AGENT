---
summary: "Install and run PASO on Windows with PowerShell or WSL2"
read_when:
  - Installing PASO on Windows
  - Choosing between the native Windows CLI and a WSL2 Gateway
  - Troubleshooting a Windows or WSL2 source install
title: "Windows"
---

# Windows

PASO supports a native Windows CLI and a Gateway running either directly on Windows or inside WSL2. The PASO project does not advertise the separately published upstream Windows Hub as a PASO release.

## Native Windows CLI and Gateway

Run the PASO source installer from PowerShell:

```powershell
& ([scriptblock]::Create((iwr -useb https://raw.githubusercontent.com/celaya-solutions/PASO-AGENT/main/scripts/install.ps1))) -InstallMethod git -Tag main
```

The installed command stays lowercase for framework compatibility. Verify the installation:

```powershell
openclaw --version
openclaw doctor
openclaw gateway status --json
```

Install the managed Gateway service:

```powershell
openclaw gateway install
openclaw gateway status --json
```

Windows uses a Scheduled Task when available. If task creation is denied, PASO falls back to a per-user Startup-folder login item.

For CLI-only use without a managed service:

```powershell
openclaw onboard --non-interactive --accept-risk --skip-health
openclaw gateway run
```

## WSL2 Gateway

WSL2 is the most Linux-compatible Gateway runtime on Windows. Install a distro from an Administrator PowerShell window:

```powershell
wsl --install
# Or choose a distro:
wsl --list --online
wsl --install -d Ubuntu-24.04
```

Enable systemd inside WSL by creating `/etc/wsl.conf`:

```ini
[boot]
systemd=true
```

Restart WSL from PowerShell:

```powershell
wsl --shutdown
```

Then open the Linux terminal and install PASO from the fork:

```bash
curl -fsSL https://raw.githubusercontent.com/celaya-solutions/PASO-AGENT/main/scripts/install.sh \
  | bash -s -- --install-method git --version main
openclaw gateway status
```

To keep the user service running after the WSL shell closes:

```bash
sudo loginctl enable-linger "$(whoami)"
openclaw gateway install
systemctl --user status openclaw-gateway.service --no-pager
```

## Connect from Windows

With the Gateway listening on its loopback default, open the Control UI from the Windows browser at:

```text
http://127.0.0.1:18789/
```

If Windows cannot reach the WSL loopback address, inspect the WSL address with `wsl hostname -I` and use a carefully scoped Windows port proxy. Do not expose the Gateway to a LAN or the public internet without authentication and the controls in [Security](/gateway/security).

## Troubleshooting

### PowerShell reports that `openclaw` is not recognized

Open a new terminal after installation. If the command is still missing, confirm `%USERPROFILE%\.local\bin` is on the user `PATH` and that `openclaw.cmd` exists there.

### WSL service does not stay running

```bash
systemctl --user is-enabled openclaw-gateway.service
systemctl --user status openclaw-gateway.service --no-pager
loginctl show-user "$(whoami)" -p Linger
```

Enable linger and reinstall the service if needed:

```bash
sudo loginctl enable-linger "$(whoami)"
openclaw gateway install --force
```

### Git or GitHub connectivity fails

The source installer needs HTTPS access to GitHub. If cloning fails, check the network, proxy, and Git configuration. Never paste access tokens into issues or logs.

## Related

- [Install overview](/install)
- [Node.js setup](/install/node)
- [Control UI](/web/control-ui)
- [Gateway configuration](/gateway/configuration)
- [Security](/gateway/security)
