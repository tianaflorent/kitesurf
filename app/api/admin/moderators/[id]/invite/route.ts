import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { sendInviteEmail } from "@/lib/email";
import { randomUUID } from "crypto";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/admin/moderators/[id]/invite
 * Send or resend an invitation email. ADMIN only.
 */
export async function POST(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireRole("ADMIN");
    if (!user) {
      return NextResponse.json(
        { error: "Permission refusée. Réservé aux administrateurs." },
        { status: 403 }
      );
    }

    const { id } = await params;

    const moderator = await prisma.user.findUnique({ where: { id } });
    if (!moderator) {
      return NextResponse.json(
        { error: "Modérateur introuvable." },
        { status: 404 }
      );
    }

    if (moderator.role !== "MODERATOR") {
      return NextResponse.json(
        { error: "Seuls les modérateurs peuvent recevoir une invitation." },
        { status: 400 }
      );
    }

    if (moderator.inviteStatus === "ACCEPTED") {
      return NextResponse.json(
        { error: "Ce modérateur a déjà accepté son invitation." },
        { status: 400 }
      );
    }

    // Generate a new token for resends
    const inviteToken = randomUUID();

    await prisma.user.update({
      where: { id },
      data: {
        inviteToken,
        invitedAt: new Date(),
      },
    });

    const result = await sendInviteEmail({
      to: moderator.email,
      firstName: moderator.firstName,
      inviteToken,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Échec de l'envoi de l'email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Invitation envoyée avec succès." });
  } catch (error) {
    console.error("[POST /api/admin/moderators/[id]/invite] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi de l'invitation." },
      { status: 500 }
    );
  }
}
