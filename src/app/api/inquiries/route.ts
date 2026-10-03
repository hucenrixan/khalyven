import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const str = (k: string, max = 2000) => String(body[k] ?? "").trim().slice(0, max);
  const data = {
    name: str("name", 120),
    company: str("company", 160),
    email: str("email", 160),
    phone: str("phone", 40),
    type: str("type", 80),
    division: str("division", 120),
    message: str("message"),
  };

  // Honeypot: bots fill this hidden field.
  if (str("website")) return NextResponse.json({ ok: true });

  if (!data.name || !data.message || !/^\S+@\S+\.\S+$/.test(data.email)) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email and a message." },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    await Inquiry.create(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Inquiry save failed:", e);
    return NextResponse.json(
      { error: "We couldn't send your inquiry right now. Please email us directly." },
      { status: 503 }
    );
  }
}
