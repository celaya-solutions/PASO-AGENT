---
summary: "Generated inventory of PASO plugins shipped in core, published externally, or kept source-only"
read_when:
  - You are deciding whether a plugin ships in the core npm package or installs separately
  - You are updating bundled plugin package metadata or release automation
  - You need the canonical internal vs external plugin list
title: "Plugin inventory"
---

# Plugin inventory

This page is generated from top-level `extensions/*/openclaw.plugin.json`
manifests and the root npm package `files` exclusions. Optional `package.json`
metadata enriches package and distribution details. Regenerate it with:

```bash
pnpm plugins:inventory:gen
```

## Definitions

- **Core npm package:** built into the `openclaw` npm package and available without a separate plugin install.
- **Official external package:** PASO-maintained plugin omitted from the core npm package, kept in this official inventory, and installed on demand through ClawHub and/or npm.
- **Source checkout only:** repo-local plugin omitted from published npm artifacts and not advertised as an installable package.

Source checkouts are different from npm installs: after `pnpm install`, bundled
plugins load from `extensions/<id>` so local edits and package-local workspace
dependencies are available.

## Install a plugin

Use the install route in each entry to decide whether install is needed. Plugins
that say `included in PASO` are already present in the core package.
Official external packages need one install, then a Gateway restart.

For example, Discord is an official external package:

```bash
openclaw plugins install @openclaw/discord
openclaw gateway restart
openclaw plugins inspect discord --runtime --json
```

During the launch cutover, ordinary bare package specs still install from npm.
Use `clawhub:@openclaw/discord` or `npm:@openclaw/discord` when you need an
explicit source. After install, follow the plugin's setup doc, such as
[Discord](/channels/discord), to add credentials and channel config. See
[Manage plugins](/plugins/manage-plugins) for update, uninstall, and publishing
commands.

Each entry lists the package, distribution route, and description.

## Core npm package

59 plugins

- **[a2a](/plugins/reference/a2a)** (`@openclaw/a2a`) - included in PASO. A2A v1.0 Agent-to-Agent protocol channel plugin.

- **[active-memory](/plugins/reference/active-memory)** (`openclaw`) - included in PASO. Runs bounded pre-reply memory retrieval and implements per-agent Remember across conversations for eligible private conversations.

- **[admin-http-rpc](/plugins/reference/admin-http-rpc)** (`@openclaw/admin-http-rpc`) - included in PASO. PASO admin HTTP RPC endpoint.

- **[alibaba](/plugins/reference/alibaba)** (`@openclaw/alibaba-provider`) - included in PASO. Adds video generation provider support.

- **[anthropic](/plugins/reference/anthropic)** (`@openclaw/anthropic-provider`) - included in PASO. Anthropic models, Claude CLI, and native Claude session catalog.

- **[azure-speech](/plugins/reference/azure-speech)** (`@openclaw/azure-speech`) - included in PASO. Azure AI Speech text-to-speech (MP3, native Ogg/Opus voice notes, PCM telephony).

- **[beam](/plugins/reference/beam)** (`@openclaw/beam`) - included in PASO. Read-only coding-session Beam receiver.

- **[bonjour](/plugins/reference/bonjour)** (`@openclaw/bonjour`) - included in PASO. Advertise the local PASO gateway over Bonjour/mDNS.

- **[browser](/plugins/reference/browser)** (`@openclaw/browser-plugin`) - included in PASO. Adds agent-callable tools.

- **[canvas](/plugins/reference/canvas)** (`@openclaw/canvas-plugin`) - included in PASO. Presents hosted widget documents on paired macOS panels.

- **[clawrouter](/plugins/reference/clawrouter)** (`@openclaw/clawrouter`) - included in PASO. Adds ClawRouter model provider support to PASO.

- **[copilot-proxy](/plugins/reference/copilot-proxy)** (`@openclaw/copilot-proxy`) - included in PASO. Adds Copilot Proxy model provider support to PASO.

- **[crabbox](/plugins/reference/crabbox)** (`@openclaw/crabbox-provider`) - included in PASO. Cloud worker provider backed by the Crabbox CLI.

- **[cua-computer](/plugins/reference/cua-computer)** (`@openclaw/cua-computer`) - included in PASO. Experimental CUA Driver computer control for macOS, Windows, and Linux node hosts.

- **[deepgram](/plugins/reference/deepgram)** (`@openclaw/deepgram-provider`) - included in PASO. Adds media understanding provider support. Adds realtime transcription provider support.

- **[device-pair](/plugins/reference/device-pair)** (`openclaw`) - included in PASO. Generate setup codes and approve device pairing requests.

- **[document-extract](/plugins/reference/document-extract)** (`@openclaw/document-extract-plugin`) - included in PASO. Extract text and fallback page images from local document attachments.

- **[elevenlabs](/plugins/reference/elevenlabs)** (`@openclaw/elevenlabs-speech`) - included in PASO. Adds media understanding provider support. Adds realtime transcription provider support. Adds text-to-speech provider support.

- **[fal](/plugins/reference/fal)** (`@openclaw/fal-provider`) - included in PASO. Adds fal model provider support to PASO.

- **[file-transfer](/plugins/reference/file-transfer)** (`@openclaw/file-transfer`) - included in PASO. Fetch, list, and write files on paired nodes via dedicated node commands. Bypasses bash stdout truncation by using base64 over node.invoke for binaries up to 16 MB.

- **[geolocation](/plugins/reference/geolocation)** (`@openclaw/geolocation-plugin`) - included in PASO. Resolves client IP addresses to a coarse city using a locally cached IP-geolocation database.

- **[github-copilot](/plugins/reference/github-copilot)** (`@openclaw/github-copilot-provider`) - included in PASO. Adds GitHub Copilot model provider support to PASO.

- **[google](/plugins/reference/google)** (`@openclaw/google-plugin`) - included in PASO. Adds Google, Google Gemini CLI, Google Vertex model provider support to PASO.

- **[huggingface](/plugins/reference/huggingface)** (`@openclaw/huggingface-provider`) - included in PASO. Adds Hugging Face model provider support to PASO.

- **[imap](/plugins/reference/imap)** (`@openclaw/imap`) - included in PASO. Watch IMAP mailboxes and dispatch authenticated incoming email to isolated agent sessions.

- **[linux-node](/plugins/reference/linux-node)** (`@openclaw/linux-node`) - included in PASO. Desktop notifications, camera capture, and location for Linux node hosts.

- **[litellm](/plugins/reference/litellm)** (`@openclaw/litellm-provider`) - included in PASO. Adds LiteLLM model provider support to PASO.

- **[llm-task](/plugins/reference/llm-task)** (`@openclaw/llm-task`) - included in PASO. Generic JSON-only LLM tool for structured tasks callable from workflows.

- **[lmstudio](/plugins/reference/lmstudio)** (`@openclaw/lmstudio-provider`) - included in PASO. Adds LM Studio model provider support to PASO.

- **[logbook](/plugins/reference/logbook)** (`@openclaw/logbook`) - included in PASO. Automatic work journal: captures periodic screen snapshots from a paired node and turns them into a reviewable timeline of your day.

- **[memory-core](/plugins/reference/memory-core)** (`@openclaw/memory-core`) - included in PASO. Adds agent-callable tools.

- **[memory-wiki](/plugins/reference/memory-wiki)** (`@openclaw/memory-wiki`) - included in PASO. Persistent wiki compiler and Obsidian-friendly knowledge vault for PASO.

- **[microsoft](/plugins/reference/microsoft)** (`@openclaw/microsoft-speech`) - included in PASO. Adds text-to-speech provider support.

- **[microsoft-foundry](/plugins/reference/microsoft-foundry)** (`@openclaw/microsoft-foundry`) - included in PASO. Adds Microsoft Foundry model provider support to PASO.

- **[migrate-claude](/plugins/reference/migrate-claude)** (`@openclaw/migrate-claude`) - included in PASO. Imports Claude Code and Claude Desktop instructions, MCP servers, skills, and safe configuration into PASO.

- **[migrate-hermes](/plugins/reference/migrate-hermes)** (`@openclaw/migrate-hermes`) - included in PASO. Imports Hermes configuration, memories, skills, and supported credentials into PASO.

- **[minimax](/plugins/reference/minimax)** (`@openclaw/minimax-provider`) - included in PASO. Adds MiniMax, MiniMax Portal model provider support to PASO.

- **[nvidia](/plugins/reference/nvidia)** (`@openclaw/nvidia-provider`) - included in PASO. Adds NVIDIA model provider support to PASO.

- **[oc-path](/plugins/reference/oc-path)** (`@openclaw/oc-path`) - included in PASO. Adds the openclaw path CLI for oc:// workspace file addressing.

- **[ollama](/plugins/reference/ollama)** (`@openclaw/ollama-provider`) - included in PASO. Adds Ollama, Ollama Cloud model provider support to PASO.

- **[onepassword](/plugins/reference/onepassword)** (`@openclaw/onepassword`) - included in PASO. 1Password SecretRef resolver and curated agent broker with approval policy and SQLite audit history.

- **[openai](/plugins/reference/openai)** (`@openclaw/openai-provider`) - included in PASO. Adds OpenAI model provider support to PASO.

- **[opencode-go](/plugins/reference/opencode-go)** (`@openclaw/opencode-go-provider`) - included in PASO. Adds OpenCode Go model provider support to PASO.

- **[openrouter](/plugins/reference/openrouter)** (`@openclaw/openrouter-provider`) - included in PASO. Adds OpenRouter model provider support to PASO.

- **[policy](/plugins/reference/policy)** (`@openclaw/policy`) - included in PASO. Adds policy-backed doctor checks for workspace conformance.

- **[reef](/plugins/reference/reef)** (`@openclaw/reef`) - included in PASO. Guarded end-to-end encrypted claw channel.

- **[runway](/plugins/reference/runway)** (`@openclaw/runway-provider`) - included in PASO. Adds video generation provider support.

- **[senseaudio](/plugins/reference/senseaudio)** (`@openclaw/senseaudio-provider`) - included in PASO. Adds media understanding provider support.

- **[sglang](/plugins/reference/sglang)** (`@openclaw/sglang-provider`) - included in PASO. Adds SGLang model provider support to PASO.

- **[talk-voice](/plugins/reference/talk-voice)** (`openclaw`) - included in PASO. Manage Talk voice selection (list/set).

- **[telegram](/plugins/reference/telegram)** (`@openclaw/telegram`) - included in PASO. Adds the Telegram channel surface for sending and receiving PASO messages.

- **[together](/plugins/reference/together)** (`@openclaw/together-provider`) - included in PASO. Adds Together model provider support to PASO.

- **[tts-local-cli](/plugins/reference/tts-local-cli)** (`@openclaw/tts-local-cli`) - included in PASO. Adds text-to-speech provider support.

- **[vault](/plugins/reference/vault)** (`@openclaw/vault`) - included in PASO. HashiCorp Vault SecretRef provider integration.

- **[vllm](/plugins/reference/vllm)** (`@openclaw/vllm-provider`) - included in PASO. Adds vLLM model provider support to PASO.

- **[web-readability](/plugins/reference/web-readability)** (`@openclaw/web-readability-plugin`) - included in PASO. Extract readable article content from local HTML web fetch responses.

- **[webhooks](/plugins/reference/webhooks)** (`@openclaw/webhooks`) - included in PASO. Authenticated inbound webhooks that bind external automation to PASO TaskFlows.

- **[workboard](/plugins/reference/workboard)** (`@openclaw/workboard`) - included in PASO. Dashboard workboard for agent-owned issues and sessions.

- **[xai](/plugins/reference/xai)** (`@openclaw/xai-plugin`) - included in PASO. Adds xAI model provider support to PASO.

## Official external packages

90 plugins

- **[acpx](/plugins/reference/acpx)** (`@openclaw/acpx`) - npm; ClawHub. PASO ACP runtime backend with plugin-owned session and transport management.

- **[amazon-bedrock](/plugins/reference/amazon-bedrock)** (`@openclaw/amazon-bedrock-provider`) - npm; ClawHub. PASO Amazon Bedrock provider plugin with model discovery, embeddings, and guardrail support.

- **[amazon-bedrock-mantle](/plugins/reference/amazon-bedrock-mantle)** (`@openclaw/amazon-bedrock-mantle-provider`) - npm; ClawHub. PASO Amazon Bedrock Mantle provider plugin for OpenAI-compatible model routing.

- **[anthropic-vertex](/plugins/reference/anthropic-vertex)** (`@openclaw/anthropic-vertex-provider`) - npm; ClawHub. PASO Anthropic Vertex provider plugin for Claude models on Google Vertex AI.

- **[arcee](/plugins/reference/arcee)** (`@openclaw/arcee-provider`) - npm; ClawHub: `clawhub:@openclaw/arcee-provider`. Adds Arcee model provider support to PASO.

- **[baseten](/plugins/reference/baseten)** (`@openclaw/baseten-provider`) - npm; ClawHub: `clawhub:@openclaw/baseten-provider`. PASO Baseten provider plugin.

- **[brave](/plugins/reference/brave)** (`@openclaw/brave-plugin`) - npm; ClawHub. PASO Brave Search provider plugin for web search.

- **[buzz](/plugins/reference/buzz)** (`@openclaw/buzz`) - npm; ClawHub: `clawhub:@openclaw/buzz`. Connect PASO agents to Buzz rooms.

- **[byteplus](/plugins/reference/byteplus)** (`@openclaw/byteplus-provider`) - npm; ClawHub: `clawhub:@openclaw/byteplus-provider`. Adds BytePlus, BytePlus Plan model provider support to PASO.

- **[cerebras](/plugins/reference/cerebras)** (`@openclaw/cerebras-provider`) - npm; ClawHub: `clawhub:@openclaw/cerebras-provider`. Adds Cerebras model provider support to PASO.

- **[chutes](/plugins/reference/chutes)** (`@openclaw/chutes-provider`) - npm; ClawHub: `clawhub:@openclaw/chutes-provider`. Adds Chutes model provider support to PASO.

- **[clickclack](/plugins/reference/clickclack)** (`@openclaw/clickclack`) - npm; ClawHub: `clawhub:@openclaw/clickclack`. Adds the Clickclack channel surface for sending and receiving PASO messages.

- **[cloudflare-ai-gateway](/plugins/reference/cloudflare-ai-gateway)** (`@openclaw/cloudflare-ai-gateway-provider`) - npm; ClawHub: `clawhub:@openclaw/cloudflare-ai-gateway-provider`. Adds Cloudflare AI Gateway model provider support to PASO.

- **[codex](/plugins/reference/codex)** (`@openclaw/codex`) - npm; ClawHub. Codex app-server harness and native session catalog.

- **[cohere](/plugins/reference/cohere)** (`@openclaw/cohere-provider`) - npm; ClawHub: `clawhub:@openclaw/cohere-provider`. PASO Cohere provider plugin.

- **[comfy](/plugins/reference/comfy)** (`@openclaw/comfy-provider`) - npm; ClawHub: `clawhub:@openclaw/comfy-provider`. Adds ComfyUI model provider support to PASO.

- **[copilot](/plugins/reference/copilot)** (`@openclaw/copilot`) - npm; ClawHub: `clawhub:@openclaw/copilot`. Registers the GitHub Copilot agent runtime.

- **[deepinfra](/plugins/reference/deepinfra)** (`@openclaw/deepinfra-provider`) - npm; ClawHub: `clawhub:@openclaw/deepinfra-provider`. Adds DeepInfra model provider support to PASO.

- **[deepseek](/plugins/reference/deepseek)** (`@openclaw/deepseek-provider`) - npm; ClawHub: `clawhub:@openclaw/deepseek-provider`. Adds DeepSeek model provider support to PASO.

- **[diagnostics-otel](/plugins/reference/diagnostics-otel)** (`@openclaw/diagnostics-otel`) - npm; ClawHub: `clawhub:@openclaw/diagnostics-otel`. PASO diagnostics OpenTelemetry exporter for metrics, traces, and logs.

- **[diagnostics-prometheus](/plugins/reference/diagnostics-prometheus)** (`@openclaw/diagnostics-prometheus`) - npm; ClawHub: `clawhub:@openclaw/diagnostics-prometheus`. PASO diagnostics Prometheus exporter for runtime metrics.

- **[diffs](/plugins/reference/diffs)** (`@openclaw/diffs`) - npm; ClawHub: `clawhub:@openclaw/diffs`. PASO read-only diff viewer plugin and file renderer for agents.

- **[diffs-language-pack](/plugins/reference/diffs-language-pack)** (`@openclaw/diffs-language-pack`) - npm; ClawHub: `clawhub:@openclaw/diffs-language-pack`. Adds syntax highlighting for languages outside the default diffs viewer set.

- **[discord](/plugins/reference/discord)** (`@openclaw/discord`) - npm; ClawHub. PASO Discord channel plugin for channels, DMs, commands, and app events.

- **[duckduckgo](/plugins/reference/duckduckgo)** (`@openclaw/duckduckgo-plugin`) - npm; ClawHub: `clawhub:@openclaw/duckduckgo-plugin`. Adds web search provider support.

- **[exa](/plugins/reference/exa)** (`@openclaw/exa-plugin`) - npm; ClawHub: `clawhub:@openclaw/exa-plugin`. Adds web search provider support.

- **[featherless](/plugins/reference/featherless)** (`@openclaw/featherless-provider`) - npm; ClawHub: `clawhub:@openclaw/featherless-provider`. PASO Featherless AI provider plugin.

- **[feishu](/plugins/reference/feishu)** (`@openclaw/feishu`) - npm; ClawHub. PASO Feishu/Lark channel plugin for chats and workplace tools (community maintained by @m1heng).

- **[firecrawl](/plugins/reference/firecrawl)** (`@openclaw/firecrawl-plugin`) - npm; ClawHub: `clawhub:@openclaw/firecrawl-plugin`. Adds agent-callable tools. Adds web fetch provider support. Adds web search provider support.

- **[fireworks](/plugins/reference/fireworks)** (`@openclaw/fireworks-provider`) - npm; ClawHub: `clawhub:@openclaw/fireworks-provider`. Adds Fireworks model provider support to PASO.

- **[fish-audio-speech](/plugins/reference/fish-audio-speech)** (`@openclaw/fish-audio-speech`) - npm; ClawHub: `clawhub:@openclaw/fish-audio-speech`. Fish Audio S2.1 hosted text-to-speech with streaming, voice notes, and telephony output.

- **[gmi](/plugins/reference/gmi)** (`@openclaw/gmi-provider`) - npm; ClawHub: `clawhub:@openclaw/gmi-provider`. PASO GMI Cloud provider plugin.

- **[google-meet](/plugins/reference/google-meet)** (`@openclaw/google-meet`) - npm; ClawHub. PASO Google Meet participant plugin for joining calls through Chrome or Twilio transports.

- **[googlechat](/plugins/reference/googlechat)** (`@openclaw/googlechat`) - npm; ClawHub. PASO Google Chat channel plugin for spaces and direct messages.

- **[gradium](/plugins/reference/gradium)** (`@openclaw/gradium-speech`) - npm; ClawHub: `clawhub:@openclaw/gradium-speech`. Adds text-to-speech provider support.

- **[groq](/plugins/reference/groq)** (`@openclaw/groq-provider`) - npm; ClawHub: `clawhub:@openclaw/groq-provider`. Adds Groq model provider support to PASO.

- **[imessage](/plugins/reference/imessage)** (`@openclaw/imessage`) - npm; ClawHub: `clawhub:@openclaw/imessage`. Adds the iMessage channel surface for sending and receiving PASO messages.

- **[inworld](/plugins/reference/inworld)** (`@openclaw/inworld-speech`) - npm; ClawHub: `clawhub:@openclaw/inworld-speech`. Inworld streaming text-to-speech (MP3, OGG_OPUS, PCM telephony).

- **[irc](/plugins/reference/irc)** (`@openclaw/irc`) - npm; ClawHub: `clawhub:@openclaw/irc`. Adds the IRC channel surface for sending and receiving PASO messages.

- **[kilocode](/plugins/reference/kilocode)** (`@openclaw/kilocode-provider`) - npm; ClawHub: `clawhub:@openclaw/kilocode-provider`. Adds Kilocode model provider support to PASO.

- **[kimi](/plugins/reference/kimi)** (`@openclaw/kimi-provider`) - npm; ClawHub: `clawhub:@openclaw/kimi-provider`. Adds Kimi, Kimi Coding model provider support to PASO.

- **[line](/plugins/reference/line)** (`@openclaw/line`) - npm; ClawHub. PASO LINE channel plugin for LINE Bot API chats.

- **[llama-cpp](/plugins/reference/llama-cpp)** (`@openclaw/llama-cpp-provider`) - npm; ClawHub. Managed and external llama.cpp servers for GGUF chat and embeddings.

- **[lobster](/plugins/reference/lobster)** (`@openclaw/lobster`) - npm; ClawHub. Lobster workflow tool plugin for typed pipelines and resumable approvals.

- **[longcat](/plugins/reference/longcat)** (`@openclaw/longcat-provider`) - npm; ClawHub: `clawhub:@openclaw/longcat-provider`. PASO LongCat provider plugin.

- **[matrix](/plugins/reference/matrix)** (`@openclaw/matrix`) - ClawHub: `clawhub:@openclaw/matrix`; npm. PASO Matrix channel plugin for rooms and direct messages.

- **[mattermost](/plugins/reference/mattermost)** (`@openclaw/mattermost`) - npm; ClawHub: `clawhub:@openclaw/mattermost`. Adds the Mattermost channel surface for sending and receiving PASO messages.

- **[memory-lancedb](/plugins/reference/memory-lancedb)** (`@openclaw/memory-lancedb`) - npm; ClawHub. PASO LanceDB-backed long-term memory plugin with auto-recall, auto-capture, and vector search.

- **[meta](/plugins/reference/meta)** (`@openclaw/meta-provider`) - npm; ClawHub: `clawhub:@openclaw/meta-provider`. Adds Meta model provider support to PASO.

- **[mistral](/plugins/reference/mistral)** (`@openclaw/mistral-provider`) - npm; ClawHub: `clawhub:@openclaw/mistral-provider`. Adds Mistral model provider support to PASO.

- **[moonshot](/plugins/reference/moonshot)** (`@openclaw/moonshot-provider`) - npm; ClawHub: `clawhub:@openclaw/moonshot-provider`. Adds Moonshot model provider support to PASO.

- **[msteams](/plugins/reference/msteams)** (`@openclaw/msteams`) - npm; ClawHub. PASO Microsoft Teams channel plugin for bot conversations.

- **[mxc](/plugins/reference/mxc)** (`@openclaw/mxc-sandbox`) - npm; ClawHub. OS-level sandboxed tool execution via MXC: runs commands in a Windows ProcessContainer with configured MXC policy files.

- **[nextcloud-talk](/plugins/reference/nextcloud-talk)** (`@openclaw/nextcloud-talk`) - npm; ClawHub. PASO Nextcloud Talk channel plugin for conversations.

- **[nostr](/plugins/reference/nostr)** (`@openclaw/nostr`) - npm; ClawHub. PASO Nostr channel plugin for NIP-04 encrypted direct messages.

- **[novita](/plugins/reference/novita)** (`@openclaw/novita-provider`) - npm; ClawHub: `clawhub:@openclaw/novita-provider`. Adds Novita, Novita AI, Novitaai model provider support to PASO.

- **[opencode](/plugins/reference/opencode)** (`@openclaw/opencode-provider`) - npm; ClawHub: `clawhub:@openclaw/opencode-provider`. Adds OpenCode model provider support to PASO.

- **[openshell](/plugins/reference/openshell)** (`@openclaw/openshell-sandbox`) - npm; ClawHub. PASO sandbox backend for the NVIDIA OpenShell CLI with mirrored local workspaces and SSH command execution.

- **[parallel](/tools/parallel-search)** (`@openclaw/parallel-plugin`) - npm; ClawHub: `clawhub:@openclaw/parallel-plugin`. Adds web search provider support.

- **[perplexity](/plugins/reference/perplexity)** (`@openclaw/perplexity-plugin`) - npm; ClawHub: `clawhub:@openclaw/perplexity-plugin`. Adds web search provider support.

- **[pixverse](/plugins/reference/pixverse)** (`@openclaw/pixverse-provider`) - npm; ClawHub: `clawhub:@openclaw/pixverse-provider`. PASO PixVerse video generation provider plugin.

- **[qianfan](/plugins/reference/qianfan)** (`@openclaw/qianfan-provider`) - npm; ClawHub: `clawhub:@openclaw/qianfan-provider`. Adds Qianfan model provider support to PASO.

- **[qqbot](/plugins/reference/qqbot)** (`@tencent-connect/openclaw-qqbot`) - npm. PASO QQ Bot channel plugin for group and direct-message workflows.

- **[qwen](/plugins/reference/qwen)** (`@openclaw/qwen-provider`) - npm; ClawHub: `clawhub:@openclaw/qwen-provider`. Adds Qwen, Qwen Cloud, Model Studio, DashScope, Qwen Token Plan, Bailian Token Plan model provider support to PASO.

- **[raft](/plugins/reference/raft)** (`@openclaw/raft`) - npm; ClawHub. PASO Raft channel plugin for secure CLI wake bridges.

- **[searxng](/plugins/reference/searxng)** (`@openclaw/searxng-plugin`) - npm; ClawHub: `clawhub:@openclaw/searxng-plugin`. Adds web search provider support.

- **[signal](/plugins/reference/signal)** (`@openclaw/signal`) - npm; ClawHub: `clawhub:@openclaw/signal`. Adds the Signal channel surface for sending and receiving PASO messages.

- **[slack](/plugins/reference/slack)** (`@openclaw/slack`) - npm; ClawHub. PASO Slack channel plugin for channels, DMs, commands, and app events.

- **[sms](/plugins/reference/sms)** (`@openclaw/sms`) - npm; ClawHub: `clawhub:@openclaw/sms`. Twilio SMS/MMS channel plugin for PASO messages.

- **[stepfun](/plugins/reference/stepfun)** (`@openclaw/stepfun-provider`) - npm; ClawHub: `clawhub:@openclaw/stepfun-provider`. Adds StepFun, StepFun Plan model provider support to PASO.

- **[synology-chat](/plugins/reference/synology-chat)** (`@openclaw/synology-chat`) - npm; ClawHub. Synology Chat channel plugin for PASO channels and direct messages.

- **[synthetic](/plugins/reference/synthetic)** (`@openclaw/synthetic-provider`) - npm; ClawHub: `clawhub:@openclaw/synthetic-provider`. Adds Synthetic model provider support to PASO.

- **[tavily](/plugins/reference/tavily)** (`@openclaw/tavily-plugin`) - npm; ClawHub: `clawhub:@openclaw/tavily-plugin`. Adds agent-callable tools. Adds web search provider support.

- **[teams-meetings](/plugins/reference/teams-meetings)** (`@openclaw/teams-meetings`) - npm; ClawHub: `clawhub:@openclaw/teams-meetings`. Join Microsoft Teams meetings as a Chrome browser guest.

- **[tencent](/plugins/reference/tencent)** (`@openclaw/tencent-provider`) - npm; ClawHub: `clawhub:@openclaw/tencent-provider`. Adds Tencent TokenHub, Tencent Tokenplan model provider support to PASO.

- **[tlon](/plugins/reference/tlon)** (`@openclaw/tlon`) - npm; ClawHub. PASO Tlon/Urbit channel plugin for chat workflows.

- **[tokenjuice](/plugins/reference/tokenjuice)** (`@openclaw/tokenjuice`) - npm; ClawHub: `clawhub:@openclaw/tokenjuice`. Compacts exec and bash tool results with tokenjuice reducers.

- **[twitch](/plugins/reference/twitch)** (`@openclaw/twitch`) - npm; ClawHub. PASO Twitch channel plugin for chat and moderation workflows.

- **[venice](/plugins/reference/venice)** (`@openclaw/venice-provider`) - npm; ClawHub: `clawhub:@openclaw/venice-provider`. Adds Venice model provider support to PASO.

- **[vercel-ai-gateway](/plugins/reference/vercel-ai-gateway)** (`@openclaw/vercel-ai-gateway-provider`) - npm; ClawHub: `clawhub:@openclaw/vercel-ai-gateway-provider`. Adds Vercel AI Gateway model provider support to PASO.

- **[voice-call](/plugins/reference/voice-call)** (`@openclaw/voice-call`) - npm; ClawHub. PASO voice-call plugin for Twilio, Telnyx, and Plivo phone calls.

- **[volcengine](/plugins/reference/volcengine)** (`@openclaw/volcengine-provider`) - npm; ClawHub: `clawhub:@openclaw/volcengine-provider`. Adds Volcengine, Volcengine Plan model provider support to PASO.

- **[voyage](/plugins/reference/voyage)** (`@openclaw/voyage-provider`) - npm; ClawHub: `clawhub:@openclaw/voyage-provider`. Adds embedding provider support, including memory search.

- **[vydra](/plugins/reference/vydra)** (`@openclaw/vydra-provider`) - npm; ClawHub: `clawhub:@openclaw/vydra-provider`. Adds Vydra model provider support to PASO.

- **[whatsapp](/plugins/reference/whatsapp)** (`@openclaw/whatsapp`) - ClawHub: `clawhub:@openclaw/whatsapp`; npm. PASO WhatsApp channel plugin for WhatsApp Web chats.

- **[xiaomi](/plugins/reference/xiaomi)** (`@openclaw/xiaomi-provider`) - npm; ClawHub: `clawhub:@openclaw/xiaomi-provider`. Adds Xiaomi, Xiaomi Token Plan model provider support to PASO.

- **[zai](/plugins/reference/zai)** (`@openclaw/zai-provider`) - npm; ClawHub: `clawhub:@openclaw/zai-provider`. Adds Z.AI model provider support to PASO.

- **[zalo](/plugins/reference/zalo)** (`@openclaw/zalo`) - npm; ClawHub. PASO Zalo channel plugin for bot and webhook chats.

- **[zalouser](/plugins/reference/zalouser)** (`@openclaw/zalouser`) - npm; ClawHub. PASO Zalo Personal Account plugin via native zca-js integration.

- **[zoom-meetings](/plugins/reference/zoom-meetings)** (`@openclaw/zoom-meetings`) - npm; ClawHub: `clawhub:@openclaw/zoom-meetings`. Join Zoom meetings as a Chrome browser guest.

## Source checkout only

3 plugins

- **[qa-channel](/plugins/reference/qa-channel)** (`@openclaw/qa-channel`) - source checkout only. Adds the QA Channel surface for sending and receiving PASO messages.

- **[qa-lab](/plugins/reference/qa-lab)** (`@openclaw/qa-lab`) - source checkout only. PASO QA lab plugin with private debugger UI and scenario runner.

- **[visitor-access](/plugins/reference/visitor-access)** (`@openclaw/visitor-access`) - source checkout only. Manage expiring visitor grants through one Cloudflare Access email policy.
