import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleDbError } from "@/lib/db-error";

/**
 * GET /api/admin/reviews
 * Retourne tous les avis (PENDING, APPROVED, REJECTED), triés par date de création.
 * Réservé à l'administration — protégé par JWT (ADMIN ou MODERATOR).
 */
export async function GET() {
  try {
    const user = await requireRole("ADMIN", "MODERATOR");
    if (!user) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return handleDbError(error, "[GET /api/admin/reviews]", "Erreur serveur lors de la récupération des avis.");
  }
}
