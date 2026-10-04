import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const globalCache = globalThis as unknown as {
  _mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};
const cache = (globalCache._mongoose ??= { conn: null, promise: null });

export async function connectDB() {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (cache.conn) return cache.conn;
  cache.promise ??= mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 5000 });
  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null; // don't cache a failed connection
    throw e;
  }
  return cache.conn;
}
