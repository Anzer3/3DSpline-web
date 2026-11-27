import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Web je čistě statický (SSG bez revalidace), stačí tedy read-only cache
// servírovaná ze statických assetů – žádný R2 bucket ani KV není potřeba.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
