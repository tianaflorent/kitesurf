import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";

/**
 * POST /api/auth/accept-invite
 * Public endpoint. Accepts an invite token and new password.
 * Sets the user's password and marks the invite as ACCEPTED.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || !body.token || !body.password) {
      return NextResponse.json(
        { error: "Le token et le mot de passe sont requis." },
        { status: 400 }
      );
    }

    const { token, password } = body as { token: string; password: string };

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe administrateur/modérateur doit contenir au moins 8 caractères." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { inviteToken: token },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token d'invitation invalide ou expiré." },
        { status: 404 }
      );
    }

    if (user.inviteStatus === "ACCEPTED") {
      return NextResponse.json(
        { error: "Cette invitation a déjà été acceptée." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        inviteStatus: "ACCEPTED",
        // Au lieu de null (qui crashe MongoDB car null doit être unique), on met un identifiant révoqué unique
        inviteToken: `revoked-${user.id}`,
      },
    });

    const payload = {
      userId: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role as "ADMIN" | "MODERATOR",
    };

    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    const res = NextResponse.json({
      message: "Compte activé avec succès. Connexion en cours...",
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
      }
    });

    setAuthCookies(accessToken, refreshToken, res.cookies);

    return res;
  } catch (error) {
    console.error("[POST /api/auth/accept-invite] Erreur :", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur serveur: ${message}` },
      { status: 500 }
    );
  }
}
