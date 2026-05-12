// Story 4.6 — in-memory LRU rate limit (5 hits / IP / hour) for /api/contact.
// Process-local; if you scale to multi-process behind PM2 cluster mode, swap
// for a shared store (Redis). For a single-server v1 this is enough.

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const MAX_KEYS = 10_000;

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    const fresh: Bucket = { count: 1, resetAt: now + WINDOW_MS };
    buckets.set(key, fresh);
    if (buckets.size > MAX_KEYS) {
      // Drop the oldest entries by insertion order (Map preserves it).
      const overflow = buckets.size - MAX_KEYS;
      let i = 0;
      for (const k of buckets.keys()) {
        if (i++ >= overflow) break;
        buckets.delete(k);
      }
    }
    return { ok: true, remaining: LIMIT - 1, resetAt: fresh.resetAt };
  }
  if (existing.count >= LIMIT) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  return { ok: true, remaining: LIMIT - existing.count, resetAt: existing.resetAt };
}
