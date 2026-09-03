/**
 * Client Persistent Cache & Tiered Fallback Helper
 * Safely works in both Browser (localStorage) and SSR/Node (MemoryCache).
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();

const CACHE_PREFIX = "vdcd_cache_";

export function getClientCache<T>(key: string): T | null {
  const fullKey = `${CACHE_PREFIX}${key}`;

  // 1. Check memory cache first
  const mem = memoryCache.get(fullKey);
  if (mem) {
    if (!mem.ttl || Date.now() - mem.timestamp < mem.ttl) {
      return mem.data as T;
    }
    memoryCache.delete(fullKey);
  }

  // 2. Check localStorage (Browser only)
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(fullKey);
      if (!raw) return null;
      const parsed: CacheEntry<T> = JSON.parse(raw);
      if (parsed.ttl && Date.now() - parsed.timestamp >= parsed.ttl) {
        window.localStorage.removeItem(fullKey);
        return null;
      }
      // Populate memory cache for faster subsequent reads
      memoryCache.set(fullKey, parsed);
      return parsed.data;
    } catch {
      // Storage read error or corrupted JSON
      return null;
    }
  }

  return null;
}

export function setClientCache<T>(key: string, data: T, ttlMs?: number): void {
  const fullKey = `${CACHE_PREFIX}${key}`;
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    ttl: ttlMs,
  };

  memoryCache.set(fullKey, entry as CacheEntry<unknown>);

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(fullKey, JSON.stringify(entry));
    } catch {
      // Storage full or quota exceeded - silent fail, memory cache still holds
    }
  }
}

export interface FetchWithFallbackOptions<T> {
  key: string;
  fetcher: () => Promise<T>;
  fallback: T | (() => T);
  ttlMs?: number;
  useMock?: boolean;
}

/**
 * Executes a network fetch with tiered fallback:
 * 1. If useMock is true -> returns static fallback.
 * 2. Attempts API fetcher. On success -> updates cache & returns data.
 * 3. On error -> attempts to retrieve latest cached data from localStorage.
 * 4. If cache is empty -> returns static fallback.
 */
export async function fetchWithFallback<T>({
  key,
  fetcher,
  fallback,
  ttlMs,
  useMock = false,
}: FetchWithFallbackOptions<T>): Promise<T> {
  const getStaticFallback = (): T =>
    typeof fallback === "function" ? (fallback as () => T)() : fallback;

  if (useMock) {
    return getStaticFallback();
  }

  try {
    const data = await fetcher();
    if (data !== null && data !== undefined) {
      setClientCache(key, data, ttlMs);
      return data;
    }
  } catch (err) {
    console.warn(
      `[fetchWithFallback] Fetch for '${key}' failed. Checking cache.`,
      err,
    );
  }

  // Fallback Tier 1: Client persistent cache (latest successful API snapshot)
  const cached = getClientCache<T>(key);
  if (cached !== null && cached !== undefined) {
    return cached;
  }

  // Fallback Tier 2: Static code mock data
  return getStaticFallback();
}
