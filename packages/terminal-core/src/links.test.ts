// Terminal Core tests cover links behavior.
import { describe, expect, it } from "vitest";
import { formatDocsLink } from "./links.js";

describe("formatDocsLink", () => {
  it("prepends the docs root when given a relative path", () => {
    const out = formatDocsLink("/channels/quietchat", "quietchat");
    expect(out).toBe(
      "https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/channels/quietchat.md",
    );
  });

  it("preserves an absolute http url", () => {
    const out = formatDocsLink("https://example.com/page", "page");
    expect(out).toBe("https://example.com/page");
  });

  it("preserves uppercase absolute HTTPS urls", () => {
    const out = formatDocsLink("HTTPS://example.com/page", "page");
    expect(out).toBe("HTTPS://example.com/page");
  });

  it("moves legacy docs links and labels to the PASO repository", () => {
    const out = formatDocsLink(
      "https://docs.openclaw.ai/cli/status?source=cli#health",
      "docs.openclaw.ai/cli/status",
      { force: true },
    );
    expect(out).toContain(
      "https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/cli/status.md?source=cli#health",
    );
    expect(out).toContain("PASO docs/cli/status");
    expect(out).not.toContain("docs.openclaw.ai");
  });

  it("does not treat http-prefixed relative paths as absolute urls", () => {
    const out = formatDocsLink("http-status", "HTTP status");
    expect(out).toBe(
      "https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/http-status.md",
    );
  });

  it("maps docs section roots to their checked-in index pages", () => {
    expect(formatDocsLink("/cli", "CLI docs")).toBe(
      "https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs/cli/index.md",
    );
  });

  it("maps docs directories without index pages to repository directories", () => {
    expect(formatDocsLink("/security", "Security docs")).toBe(
      "https://github.com/celaya-solutions/PASO-AGENT/tree/main/docs/security",
    );
  });

  it("treats whitespace-only path like an empty path and falls back to docs root", () => {
    const out = formatDocsLink("   ", "root");
    expect(out).toBe("https://github.com/celaya-solutions/PASO-AGENT/tree/main/docs");
  });

  it("falls back to docs root when path is undefined (regression: #67076, #67074)", () => {
    const out = formatDocsLink(undefined as unknown as string, "label");
    expect(out).toBe("https://github.com/celaya-solutions/PASO-AGENT/tree/main/docs");
  });

  it("falls back to docs root when path is null", () => {
    const out = formatDocsLink(null as unknown as string);
    expect(out).toBe("https://github.com/celaya-solutions/PASO-AGENT/tree/main/docs");
  });

  it("strips terminal controls from non-OSC docs fallback text", () => {
    const out = formatDocsLink("https://example.com/a\u0007b", "docs\u001b[31m", {
      force: false,
    });

    expect(out).toBe("https://example.com/ab");
  });
});
