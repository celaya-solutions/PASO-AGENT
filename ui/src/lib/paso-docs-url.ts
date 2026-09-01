export const PASO_DOCS_REPO_ROOT = "https://github.com/celaya-solutions/PASO-AGENT/tree/main/docs";
const PASO_DOCS_BLOB_ROOT = "https://github.com/celaya-solutions/PASO-AGENT/blob/main/docs";

const INDEX_ROUTES = new Set([
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

const DIRECTORY_ROUTES = new Set([
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

export function pasoDocsUrl(input: string | undefined | null): string {
  const trimmed = typeof input === "string" ? input.trim() : "";
  if (!trimmed) {
    return PASO_DOCS_REPO_ROOT;
  }
  const parsed = new URL(trimmed.startsWith("/") ? trimmed : `/${trimmed}`, "https://paso.invalid");
  const route = parsed.pathname.replace(/^\/+|\/+$/gu, "");
  if (!route) {
    return `${PASO_DOCS_REPO_ROOT}${parsed.search}${parsed.hash}`;
  }
  if (DIRECTORY_ROUTES.has(route)) {
    return `${PASO_DOCS_REPO_ROOT}/${route}${parsed.search}${parsed.hash}`;
  }
  const hasExtension = /\/[^/]+\.[a-z0-9]+$/iu.test(`/${route}`);
  const filePath = INDEX_ROUTES.has(route)
    ? `${route}/index.md`
    : hasExtension
      ? route
      : `${route}.md`;
  return `${PASO_DOCS_BLOB_ROOT}/${filePath}${parsed.search}${parsed.hash}`;
}
