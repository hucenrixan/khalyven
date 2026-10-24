import { connectDB } from "./mongodb";
import { RateLimit } from "@/models/Content";

/** Returns true if the caller is still under `max` hits per `windowSec` for this key. */
export async function allow(key: string, max: number, windowSec: number) {
  try {
    await connectDB();
    const now = Date.now();
    const doc = await RateLimit.findOneAndUpdate(
      { key, expiresAt: { $gt: new Date(now) } },
      { $inc: { count: 1 } },
      { returnDocument: "after" }
    );
    if (doc) return doc.count <= max;
    await RateLimit.findOneAndUpdate(
      { key },
      { key, count: 1, expiresAt: new Date(now + windowSec * 1000) },
      { upsert: true }
    );
    return true;
  } catch {
    return true; // never block real visitors because the limiter itself failed
  }
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
