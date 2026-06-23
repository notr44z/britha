import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await writeFile(path.join(uploadDir, file.name), buffer);

  return NextResponse.json({ url: `/uploads/${file.name}` });
}
