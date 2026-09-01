// Terminal Core module implements links behavior.
import { formatTerminalLink } from "./terminal-link.js";

export const PASO_DOCS_REPO_ROOT = "https://github.com/celaya-solutions/PASO-AGENT/tree/main/docs";
const PASO_DOCS_BLOB_ROOT = "https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs";
const PASO_DOCS_INDEX_ROUTES = new Set([
  "automation",
  "channels",
  "cli",
  "gateway",
  "gateway/security",
  "help",
  "install",
  "nodes",
  "platforms",
  "providers",
  "releases",
  "tools",
  "web",
]);
const PASO_DOCS_DIRECTORY_ROUTES = new Set([
  "announcements",
  "assets",
  "clawhub",
  "concepts",
  "diagnostics",
  "maturity",
  "plugins",
  "reference",
  "security",
  "snippets",
  "specs",
  "start",
]);

const ABSOLUTE_HTTP_URL_RE = /^https?:\/\//i;
const LEGACY_DOCS_HOST_RE = /^https?:\/\/docs\.openclaw\.ai(?=\/|$)/i;

/** Map a Mintlify-style docs route to the matching file in the PASO repository. */
export function resolvePasoDocsUrl(input: string | undefined | null): string {
  const trimmed = typeof input === "string" ? input.trim() : "";
  if (!trimmed) {
    return PASO_DOCS_REPO_ROOT;
  }
  const parsed = new URL(trimmed.startsWith("/") ? trimmed : `/${trimmed}`, "https://paso.invalid");
  const route = parsed.pathname.replace(/^\/+|\/+$/gu, "");
  if (!route) {
    return `${PASO_DOCS_REPO_ROOT}${parsed.search}${parsed.hash}`;
  }
  if (PASO_DOCS_DIRECTORY_ROUTES.has(route)) {
    return `${PASO_DOCS_REPO_ROOT}/${route}${parsed.search}${parsed.hash}`;
  }
  const extension = /\/[^/]+\.[a-z0-9]+$/iu.test(`/${route}`);
  const filePath = PASO_DOCS_INDEX_ROUTES.has(route)
    ? `${route}/index.md`
    : extension
      ? route
      : `${route}.md`;
  return `${PASO_DOCS_BLOB_ROOT}/${filePath}${parsed.search}${parsed.hash}`;
}

function resolveDocsUrl(trimmed: string): string {
  if (LEGACY_DOCS_HOST_RE.test(trimmed)) {
    const legacyUrl = new URL(trimmed);
    return resolvePasoDocsUrl(
      `${legacyUrl.pathname === "/" ? "" : legacyUrl.pathname}${legacyUrl.search}${legacyUrl.hash}`,
    );
  }
  if (ABSOLUTE_HTTP_URL_RE.test(trimmed)) {
    return trimmed;
  }
  return resolvePasoDocsUrl(trimmed);
}

function resolveDocsLabel(label: string | undefined, trimmed: string, url: string): string {
  if (!label) {
    return url;
  }
  if (!/docs\.openclaw\.ai/iu.test(label)) {
    return label;
  }
  const labelPath = LEGACY_DOCS_HOST_RE.test(trimmed) ? new URL(trimmed).pathname : trimmed;
  const suffix =
    !labelPath || labelPath === "/" ? "" : labelPath.startsWith("/") ? labelPath : `/${labelPath}`;
  return `PASO docs${suffix}`;
}

export function formatDocsLink(
  path: string | undefined | null,
  label?: string,
  opts?: { fallback?: string; force?: boolean },
): string {
  const trimmed = typeof path === "string" ? path.trim() : "";
  // When a caller has no docsPath, link to the docs root rather than crashing
  // the onboarding/channel-selection flows that pass meta.docsPath through
  // here unguarded. The typed contract says docsPath is required, but a
  // handful of channel plugins and catalog rows leave it unset at runtime.
  const url = trimmed ? resolveDocsUrl(trimmed) : PASO_DOCS_REPO_ROOT;
  return formatTerminalLink(resolveDocsLabel(label, trimmed, url), url, {
    fallback: opts?.fallback ?? url,
    force: opts?.force,
  });
}
