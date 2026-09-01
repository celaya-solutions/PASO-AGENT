import fs from "node:fs/promises";
import path from "node:path";
import type { CommandRunner } from "./update-runner-types.js";

export const PASO_GIT_REPOSITORY_URL = "https://github.com/celaya-solutions/PASO-AGENT.git";

type PasoGitRemoteKind = "paso" | "legacy-openclaw" | "other";

function normalizeGitHubRemoteUrl(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\/$/u, "")
    .replace(/\.git$/u, "");
}

/** Classify the exact PASO and inherited upstream repository URL forms we support. */
export function classifyPasoGitRemoteUrl(value: string): PasoGitRemoteKind {
  const normalized = normalizeGitHubRemoteUrl(value);
  if (
    new Set([
      "https://github.com/celaya-solutions/paso-agent",
      "http://github.com/celaya-solutions/paso-agent",
      "git://github.com/celaya-solutions/paso-agent",
      "ssh://git@github.com/celaya-solutions/paso-agent",
      "git@github.com:celaya-solutions/paso-agent",
    ]).has(normalized)
  ) {
    return "paso";
  }
  if (
    new Set([
      "https://github.com/openclaw/openclaw",
      "http://github.com/openclaw/openclaw",
      "git://github.com/openclaw/openclaw",
      "ssh://git@github.com/openclaw/openclaw",
      "git@github.com:openclaw/openclaw",
    ]).has(normalized)
  ) {
    return "legacy-openclaw";
  }
  return "other";
}

export type PasoGitOriginResult =
  | { status: "ok"; migrated: boolean }
  | {
      status: "error";
      reason:
        | "paso-origin-missing"
        | "paso-origin-invalid"
        | "paso-upstream-conflict"
        | "paso-origin-migration-failed";
    };

async function hasLocalGitMetadata(root: string): Promise<boolean> {
  try {
    await fs.stat(path.join(root, ".git"));
    return true;
  } catch {
    return false;
  }
}

async function readRemoteUrl(params: {
  root: string;
  name: string;
  runCommand: CommandRunner;
  timeoutMs: number;
}): Promise<string | null> {
  const result = await params
    .runCommand(["git", "-C", params.root, "remote", "get-url", params.name], {
      cwd: params.root,
      timeoutMs: params.timeoutMs,
    })
    .catch(() => null);
  if (!result || result.code !== 0) {
    return null;
  }
  return result.stdout.trim() || null;
}

async function runRemoteMutation(params: {
  root: string;
  argv: string[];
  runCommand: CommandRunner;
  timeoutMs: number;
}): Promise<boolean> {
  const result = await params
    .runCommand(["git", "-C", params.root, ...params.argv], {
      cwd: params.root,
      timeoutMs: params.timeoutMs,
    })
    .catch(() => null);
  return result?.code === 0;
}

/**
 * Fail closed on foreign update origins. Exact inherited OpenClaw checkouts are
 * migrated once while retaining that framework remote as `upstream`.
 *
 * Tests that provide command-only fake checkouts have no `.git` entry, so the
 * guard is intentionally a no-op there. Every real checkout reaches this with
 * local Git metadata present.
 */
export async function ensurePasoGitOrigin(params: {
  root: string;
  runCommand: CommandRunner;
  timeoutMs: number;
}): Promise<PasoGitOriginResult> {
  if (!(await hasLocalGitMetadata(params.root))) {
    return { status: "ok", migrated: false };
  }

  const originUrl = await readRemoteUrl({ ...params, name: "origin" });
  if (!originUrl) {
    return { status: "error", reason: "paso-origin-missing" };
  }
  const originKind = classifyPasoGitRemoteUrl(originUrl);
  if (originKind === "paso") {
    return { status: "ok", migrated: false };
  }
  if (originKind !== "legacy-openclaw") {
    return { status: "error", reason: "paso-origin-invalid" };
  }

  const upstreamUrl = await readRemoteUrl({ ...params, name: "upstream" });
  if (upstreamUrl && classifyPasoGitRemoteUrl(upstreamUrl) !== "legacy-openclaw") {
    return { status: "error", reason: "paso-upstream-conflict" };
  }

  let addedUpstream = false;
  if (!upstreamUrl) {
    addedUpstream = await runRemoteMutation({
      ...params,
      argv: ["remote", "add", "upstream", originUrl],
    });
    if (!addedUpstream) {
      return { status: "error", reason: "paso-origin-migration-failed" };
    }
  }

  const changedOrigin = await runRemoteMutation({
    ...params,
    argv: ["remote", "set-url", "origin", PASO_GIT_REPOSITORY_URL],
  });
  if (!changedOrigin) {
    if (addedUpstream) {
      await runRemoteMutation({ ...params, argv: ["remote", "remove", "upstream"] });
    }
    return { status: "error", reason: "paso-origin-migration-failed" };
  }

  const verifiedOrigin = await readRemoteUrl({ ...params, name: "origin" });
  if (!verifiedOrigin || classifyPasoGitRemoteUrl(verifiedOrigin) !== "paso") {
    return { status: "error", reason: "paso-origin-migration-failed" };
  }
  return { status: "ok", migrated: true };
}
