import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/reviews/[id]
 * Modifie le statut d'un avis (APPROVED ou REJECTED).
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json(
        { error: "Statut invalide. Valeurs acceptées : APPROVED, REJECTED, PENDING." },
        { status: 400 }
      );
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[PATCH /api/admin/reviews/[id]] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour de l'avis." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/reviews/[id]
 * Supprime définitivement un avis.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.review.delete({ where: { id } });

    return NextResponse.json({ message: "Avis supprimé avec succès." });
  } catch (error) {
    console.error("[DELETE /api/admin/reviews/[id]] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression de l'avis." },
      { status: 500 }
    );
  }
}
