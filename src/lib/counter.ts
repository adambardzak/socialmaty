import { kv } from "@vercel/kv";

const SOLD_KEY = "organika:sold_count";
const LIMIT = 100;

function kvAvailable() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getSpotsLeft(): Promise<{ sold: number; remaining: number; limit: number }> {
  if (!kvAvailable()) {
    // In dev / before KV is wired, return a stable mock so the UI works.
    return { sold: 0, remaining: LIMIT, limit: LIMIT };
  }
  const sold = (await kv.get<number>(SOLD_KEY)) ?? 0;
  const remaining = Math.max(0, LIMIT - sold);
  return { sold, remaining, limit: LIMIT };
}

export async function incrementSold(): Promise<number> {
  if (!kvAvailable()) return 0;
  const value = await kv.incr(SOLD_KEY);
  return value;
}
