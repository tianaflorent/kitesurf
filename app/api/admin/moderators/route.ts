import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, hashPassword } from "@/lib/auth";
import { sendInviteEmail } from "@/lib/email";
import { randomUUID } from "crypto";

/**
 * GET /api/admin/moderators
 * List all moderators. ADMIN only.
 */
export async function GET() {
  try {
    const user = await requireRole("ADMIN");
    if (!user) {
      return NextResponse.json(
        { error: "Permission refusée. Réservé aux administrateurs." },
        { status: 403 }
      );
    }

    const moderators = await prisma.user.findMany({
      where: { role: "MODERATOR" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        inviteStatus: true,
        invitedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(moderators);
  } catch (error) {
    console.error("[GET /api/admin/moderators] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des modérateurs." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/moderators
 * Create a new moderator (invite). ADMIN only.
 */
export async function POST(request: Request) {
  try {
    const user = await requireRole("ADMIN");
    if (!user) {
      return NextResponse.json(
        { error: "Permission refusée. Réservé aux administrateurs." },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.email || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: "Les champs firstName, lastName et email sont requis." },
        { status: 400 }
      );
    }

    const { email, firstName, lastName } = body as {
      email: string;
      firstName: string;
      lastName: string;
    };

    // Check for duplicate email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà." },
        { status: 409 }
      );
    }

    const inviteToken = randomUUID();
    // Temporary password — will be overwritten when invite is accepted
    const tempPassword = await hashPassword(randomUUID());

    const moderator = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: tempPassword,
        role: "MODERATOR",
        inviteToken,
        inviteStatus: "PENDING",
        invitedAt: new Date(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        inviteStatus: true,
        invitedAt: true,
        createdAt: true,
      },
    });

    const emailResult = await sendInviteEmail({
      to: email,
      firstName,
      inviteToken,
    });

    if (!emailResult.success) {
      console.error("[POST /api/admin/moderators] Erreur email :", emailResult.error);
      return NextResponse.json(
        { ...moderator, warning: "Le compte a été créé, mais l'envoi de l'email d'invitation a échoué. Veuillez renvoyer l'invitation." },
        { status: 201 }
      );
    }

    return NextResponse.json(moderator, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/moderators] Erreur :", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur serveur: ${message}` },
      { status: 500 }
    );
  }
}
