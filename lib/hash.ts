import { createHash } from "crypto";

export function getDeviceHash(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || "unknown-agent";
  const salt = process.env.HASH_SALT || "nusuk_default_secure_salt_2026";

  const raw = `${ip}::${userAgent}::${salt}`;
  return createHash("sha256").update(raw).digest("hex");
}
