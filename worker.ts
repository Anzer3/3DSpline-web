/**
 * Vstupní bod Cloudflare Workeru (viz `main` ve wrangler.jsonc).
 *
 * Obaluje Worker vygenerovaný OpenNextem a přidává cache pro optimalizované
 * obrázky z `/_next/image`. OpenNext je přes binding IMAGES převádí při každém
 * požadavku znovu (~0,5–1 s na obrázek) a u obrázků z `public/` neposílá
 * žádnou Cache-Control hlavičku, takže je prohlížeč ani Cloudflare necachují.
 *
 * - Edge cache (Cache API): hotový obrázek se uloží v datacentru Cloudflare,
 *   další návštěvníci ho dostanou bez nového převodu. Klíč obsahuje ID verze
 *   Workeru, takže každý deploy začíná s čistou cache – vyměněný obrázek
 *   v `public/` se po nasazení projeví hned.
 * - Prohlížeč: obrázek drží den a další týden ho smí zobrazit z cache,
 *   zatímco si na pozadí stáhne aktuální verzi.
 *
 * https://opennext.js.org/cloudflare/howtos/custom-worker
 */

// @ts-ignore – `.open-next/worker.js` vzniká až při `opennextjs-cloudflare build`
import { default as handler } from "./.open-next/worker.js";

interface Env {
  CF_VERSION_METADATA?: { id: string };
  [binding: string]: unknown;
}

interface Context {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

interface OpenNextHandler {
  fetch(request: Request, env: Env, ctx: Context): Promise<Response>;
}

const openNext = handler as OpenNextHandler;

const IMAGE_PATHNAME = "/_next/image";
/** Jak dlouho drží optimalizovaný obrázek prohlížeč. */
const BROWSER_CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=604800";
/** Jak dlouho drží obrázek edge cache (každý deploy ji stejně obnoví). */
const EDGE_CACHE_CONTROL = "public, max-age=2592000";

/** Stejné pořadí formátů jako `images.formats` v next.config.mjs. */
function negotiatedFormat(accept: string): string {
  if (accept.includes("image/avif")) return "avif";
  if (accept.includes("image/webp")) return "webp";
  return "original";
}

async function handleImage(request: Request, env: Env, ctx: Context): Promise<Response> {
  const edgeCache = (caches as unknown as { default: Cache }).default;

  // Odpověď se liší podle hlavičky Accept (AVIF / WebP), Cache API ale Vary
  // nerespektuje – formát i verzi deploye proto dáme přímo do klíče.
  const keyUrl = new URL(request.url);
  keyUrl.searchParams.set("__format", negotiatedFormat(request.headers.get("Accept") ?? ""));
  keyUrl.searchParams.set("__version", env.CF_VERSION_METADATA?.id ?? "local");
  const cacheKey = new Request(keyUrl.toString(), { method: "GET" });

  const cached = await edgeCache.match(cacheKey);
  if (cached) {
    return withBrowserHeaders(cached, "HIT");
  }

  const response = await openNext.fetch(request, env, ctx);
  if (response.status !== 200) {
    return response;
  }

  const forEdge = new Response(response.clone().body, response);
  if (!isImmutable(forEdge)) {
    forEdge.headers.set("Cache-Control", EDGE_CACHE_CONTROL);
  }
  forEdge.headers.delete("Vary");
  ctx.waitUntil(edgeCache.put(cacheKey, forEdge));

  return withBrowserHeaders(response, "MISS");
}

/** Obrázky ze statického importu (`/_next/static/media`) mají od OpenNextu "immutable". */
function isImmutable(response: Response): boolean {
  return response.headers.get("Cache-Control")?.includes("immutable") ?? false;
}

function withBrowserHeaders(source: Response, status: "HIT" | "MISS"): Response {
  const response = new Response(source.body, source);
  if (!isImmutable(response)) {
    response.headers.set("Cache-Control", BROWSER_CACHE_CONTROL);
  }
  response.headers.set("Vary", "Accept");
  response.headers.set("X-Image-Cache", status);
  return response;
}

export default {
  async fetch(request: Request, env: Env, ctx: Context): Promise<Response> {
    if (request.method === "GET" && new URL(request.url).pathname === IMAGE_PATHNAME) {
      return handleImage(request, env, ctx);
    }
    return openNext.fetch(request, env, ctx);
  },
};
