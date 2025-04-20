import { writeComment, writeRating } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, rating } = body;

    if (!name || !email || !message || typeof rating !== "number") {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const createdAt = new Date().toISOString();

    await writeComment({ name, email, message, rating, createdAt });
    await writeRating(rating); // Simpan rating juga di saat yang sama

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
