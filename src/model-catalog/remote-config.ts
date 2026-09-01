import type { OpenClawConfig } from "../config/types.openclaw.js";

export function isRemoteModelCatalogRefreshEnabled(config: OpenClawConfig): boolean {
  return (
    config.models?.catalogRefresh?.enabled === true &&
    Boolean(config.models.catalogRefresh.url?.trim())
  );
}

export function resolveRemoteCatalogUrl(config: OpenClawConfig): string {
  return config.models?.catalogRefresh?.url?.trim() || "";
}
