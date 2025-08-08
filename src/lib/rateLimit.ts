const buckets = new Map<string, { count: number; reset: number }>();

interface Options { windowMs: number; max: number; }

export function rateLimit(key: string, { windowMs, max }: Options) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: max - 1, reset: now + windowMs };
  }
  if (entry.count >= max) {
    return { allowed: false, remaining: 0, reset: entry.reset };
  }
  entry.count += 1;
  return { allowed: true, remaining: max - entry.count, reset: entry.reset };
}
