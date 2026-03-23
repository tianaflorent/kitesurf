import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as null | { password?: string };
    const password = body?.password ?? "";

    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD manquant côté serveur." },
        { status: 500 }
      );
    }

    if (password !== expected) {
      return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "admin_session",
      value: "1",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
