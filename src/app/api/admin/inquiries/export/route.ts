import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

// Spreadsheet apps run cells that start with these as formulas.
const cell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const rows = await Inquiry.find().sort({ createdAt: -1 }).lean();
  const head = ["Date", "Name", "Company", "Email", "Phone", "Type", "Division", "Status", "Message", "Notes"];
  const lines = rows.map((r) =>
    [
      new Date(r.createdAt as Date).toISOString(),
      r.name,
      r.company,
      r.email,
      r.phone,
      r.type,
      r.division,
      r.status,
      r.message,
      r.notes,
    ]
      .map(cell)
      .join(",")
  );
  return new NextResponse([head.map(cell).join(","), ...lines].join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
