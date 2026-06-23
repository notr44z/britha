import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (email === "admin@britha.local" && password === "britha") {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("britha-admin", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  }

  return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
}
