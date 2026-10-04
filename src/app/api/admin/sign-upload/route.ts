import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Returns a signed payload so the browser can upload straight to Cloudinary
// (avoids server request-size limits on large phone photos).
export async function POST() {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !secret) {
    return NextResponse.json(
      { error: "Photo uploads are not configured yet (missing Cloudinary keys)." },
      { status: 503 }
    );
  }

  const folder = "khalyven";
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${secret}`)
    .digest("hex");

  return NextResponse.json({ cloudName, apiKey, folder, timestamp, signature });
}
