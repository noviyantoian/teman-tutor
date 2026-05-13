/**
 * Minimal in-memory token bucket rate limiter.
 *
 * NOTE: This is per-instance memory. On Vercel serverless it's per-cold-start.
 * Good enough for fase 1 MVP to deter casual spam. Upgrade to Upstash Redis
 * (or Vercel KV) when traffic > ~1k unique IPs/day.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const CLEANUP_INTERVAL_MS = 1000 * 60 * 10; // 10 min
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  for (const [key, b] of buckets) {
    if (b.resetAt < now) buckets.delete(key);
  }
  lastCleanup = now;
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Check + record a hit for the given key.
 * @param key      , usually IP or `${IP}:${route}`
 * @param limit    , max hits per window
 * @param windowMs , window size in ms
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  cleanup();
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    const fresh: Bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, fresh);
    return { allowed: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }
  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}
