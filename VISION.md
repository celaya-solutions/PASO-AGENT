## PASO Vision

PASO is an AI agent that actually does things.
It runs on your devices, in your channels, with your rules.

PASO is developed by Celaya Solutions Research in El Paso, Texas. The goal is
to make a capable personal and team agent practical for real work while keeping
operators in control of their data, credentials, and systems.

Project overview and developer docs: [`README.md`](README.md)
Contribution guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## What PASO should feel like

- **Useful on day one.** Setup should lead to a working agent, not a maze of
  hidden requirements.
- **Present where work happens.** PASO should connect to the devices, channels,
  tools, and model providers an operator already uses.
- **Powerful with clear limits.** Risky actions should be explicit,
  understandable, and controlled by the operator.
- **Private by default.** PASO should not send analytics, tracking identifiers,
  or attribution unless the operator chooses to enable them.
- **Open and extensible.** Plugins, skills, channels, and apps should add
  capability without making the core harder to understand.

## Current priorities

1. Security and safe defaults
2. Reliable setup and first-run experience
3. Bug fixes and stability
4. Strong support for major model providers and messaging channels
5. Better computer use, agent tooling, and performance
6. Clear web and companion-app experiences

## Product direction

PASO is both a personal assistant and a team assistant. A personal install is
owned by one operator. A shared Gateway is for people who intentionally work
together and understand what they share.

The Gateway is the trusted control plane. Agent execution may run locally, in a
sandbox, on a paired device, or on a temporary worker. Policy must be enforced
in code, not only requested in a prompt.

PASO remains terminal-first while setup and security controls mature. Easier
onboarding should reveal important decisions instead of hiding them.

## Plugins and skills

Core should stay focused. Optional capabilities should normally ship as
plugins, skills, channels, or apps. When several integrations need the same
capability, the right answer is a clear shared interface rather than several
one-off implementations.

PASO keeps the compatible `openclaw` command, package scope, environment
variables, paths, and config names. Those identifiers are technical contracts;
the product and agent presented to people are PASO.

## Stewardship

Celaya Solutions Research stewards PASO and its product direction. Questions,
research partnerships, and community inquiries can be sent to
[hello@celayasolutions.com](mailto:hello@celayasolutions.com).

PASO is based on the OpenClaw framework. Upstream copyright, license terms,
third-party notices, and contributor credit remain preserved in this repository.
