import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  classifyPasoGitRemoteUrl,
  ensurePasoGitOrigin,
  PASO_GIT_REPOSITORY_URL,
} from "./paso-git-origin.js";
import type { CommandRunner } from "./update-runner-types.js";

const cleanupRoots: string[] = [];

afterEach(async () => {
  await Promise.all(cleanupRoots.splice(0).map((root) => fs.rm(root, { recursive: true })));
});

async function makeCheckout() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "paso-origin-test-"));
  cleanupRoots.push(root);
  await fs.mkdir(path.join(root, ".git"));
  return root;
}

function createRemoteRunner(initial: Record<string, string>) {
  const remotes = new Map(Object.entries(initial));
  const calls: string[] = [];
  const runCommand: CommandRunner = async (argv) => {
    calls.push(argv.join(" "));
    const args = argv.slice(3);
    if (args[0] !== "remote") {
      return { stdout: "", stderr: "unsupported", code: 1 };
    }
    if (args[1] === "get-url") {
      const value = remotes.get(args[2] ?? "");
      return value
        ? { stdout: `${value}\n`, stderr: "", code: 0 }
        : { stdout: "", stderr: "missing", code: 2 };
    }
    if (args[1] === "add") {
      const name = args[2] ?? "";
      if (!name || remotes.has(name)) {
        return { stdout: "", stderr: "exists", code: 3 };
      }
      remotes.set(name, args[3] ?? "");
      return { stdout: "", stderr: "", code: 0 };
    }
    if (args[1] === "set-url") {
      const name = args[2] ?? "";
      if (!remotes.has(name)) {
        return { stdout: "", stderr: "missing", code: 2 };
      }
      remotes.set(name, args[3] ?? "");
      return { stdout: "", stderr: "", code: 0 };
    }
    if (args[1] === "remove") {
      remotes.delete(args[2] ?? "");
      return { stdout: "", stderr: "", code: 0 };
    }
    return { stdout: "", stderr: "unsupported", code: 1 };
  };
  return { calls, remotes, runCommand };
}

describe("PASO git origin guard", () => {
  it("recognizes supported PASO and inherited framework URL forms", () => {
    expect(classifyPasoGitRemoteUrl("git@github.com:celaya-solutions/PASO-AGENT.git")).toBe("paso");
    expect(classifyPasoGitRemoteUrl("https://github.com/openclaw/openclaw.git")).toBe(
      "legacy-openclaw",
    );
    expect(classifyPasoGitRemoteUrl("https://github.com/example/openclaw.git")).toBe("other");
  });

  it("accepts the canonical PASO origin without mutation", async () => {
    const root = await makeCheckout();
    const runner = createRemoteRunner({ origin: PASO_GIT_REPOSITORY_URL });

    await expect(
      ensurePasoGitOrigin({ root, runCommand: runner.runCommand, timeoutMs: 1_000 }),
    ).resolves.toEqual({ status: "ok", migrated: false });
    expect(runner.calls).toEqual([`git -C ${root} remote get-url origin`]);
  });

  it("migrates only the exact legacy origin and preserves it as upstream", async () => {
    const root = await makeCheckout();
    const legacyUrl = "https://github.com/openclaw/openclaw.git";
    const runner = createRemoteRunner({ origin: legacyUrl });

    await expect(
      ensurePasoGitOrigin({ root, runCommand: runner.runCommand, timeoutMs: 1_000 }),
    ).resolves.toEqual({ status: "ok", migrated: true });
    expect(runner.remotes.get("origin")).toBe(PASO_GIT_REPOSITORY_URL);
    expect(runner.remotes.get("upstream")).toBe(legacyUrl);
  });

  it("fails closed for a foreign origin", async () => {
    const root = await makeCheckout();
    const runner = createRemoteRunner({ origin: "https://github.com/example/openclaw.git" });

    await expect(
      ensurePasoGitOrigin({ root, runCommand: runner.runCommand, timeoutMs: 1_000 }),
    ).resolves.toEqual({ status: "error", reason: "paso-origin-invalid" });
    expect(runner.remotes.get("origin")).toBe("https://github.com/example/openclaw.git");
  });

  it("does not overwrite an unrelated upstream remote during migration", async () => {
    const root = await makeCheckout();
    const runner = createRemoteRunner({
      origin: "https://github.com/openclaw/openclaw.git",
      upstream: "https://github.com/example/framework.git",
    });

    await expect(
      ensurePasoGitOrigin({ root, runCommand: runner.runCommand, timeoutMs: 1_000 }),
    ).resolves.toEqual({ status: "error", reason: "paso-upstream-conflict" });
    expect(runner.remotes.get("origin")).toBe("https://github.com/openclaw/openclaw.git");
  });
});
