import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/moderators/[id]
 * Update a moderator's info. ADMIN only.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireRole("ADMIN");
    if (!user) {
      return NextResponse.json(
        { error: "Permission refusée. Réservé aux administrateurs." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Corps de la requête invalide." },
        { status: 400 }
      );
    }

    const { firstName, lastName, email } = body as {
      firstName?: string;
      lastName?: string;
      email?: string;
    };

    // If email is being changed, check for conflicts
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Un utilisateur avec cet email existe déjà." },
          { status: 409 }
        );
      }
    }

    const moderator = await prisma.user.update({
      where: { id },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(email !== undefined && { email }),
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

    return NextResponse.json(moderator);
  } catch (error) {
    console.error("[PATCH /api/admin/moderators/[id]] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour du modérateur." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/moderators/[id]
 * Delete a moderator. ADMIN only. Cannot delete self or other ADMINs.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireRole("ADMIN");
    if (!user) {
      return NextResponse.json(
        { error: "Permission refusée. Réservé aux administrateurs." },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Cannot delete yourself
    if (user.userId === id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte." },
        { status: 400 }
      );
    }

    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json(
        { error: "Modérateur introuvable." },
        { status: 404 }
      );
    }

    if (target.role === "ADMIN") {
      return NextResponse.json(
        { error: "Impossible de supprimer un administrateur." },
        { status: 403 }
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "Modérateur supprimé avec succès." });
  } catch (error) {
    console.error("[DELETE /api/admin/moderators/[id]] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression du modérateur." },
      { status: 500 }
    );
  }
}
