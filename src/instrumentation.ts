// Warn at startup (and fail loudly in production) when required settings are missing.
export function register() {
  const required = ["MONGODB_URI", "AUTH_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD"];
  const missing = required.filter((k) => !process.env[k]);
  if (!missing.length) return;
  const msg = `Missing environment variables: ${missing.join(", ")}`;
  if (process.env.NODE_ENV === "production") throw new Error(msg);
  console.warn(`[khalyven] ${msg}`);
}
