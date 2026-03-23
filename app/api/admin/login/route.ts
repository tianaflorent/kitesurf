import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    
    if (!body || !body.email || !body.password) {
      return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
    }

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role as "ADMIN" | "MODERATOR",
    };

    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    const res = NextResponse.json({ 
      ok: true, 
      user: { 
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        role: user.role 
      } 
    });

    setAuthCookies(accessToken, refreshToken, res.cookies);

    return res;
  } catch (error) {
    console.error("[Login] Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
