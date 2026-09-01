import { pasoDocsUrl } from "../../lib/paso-docs-url.ts";

export function channelDocsUrl(channelId: string): string {
  return pasoDocsUrl(`/channels/${encodeURIComponent(channelId)}`);
}
