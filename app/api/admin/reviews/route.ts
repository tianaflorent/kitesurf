import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/reviews
 * Retourne tous les avis (PENDING, APPROVED, REJECTED), triés par date de création.
 * Réservé à l'administration — à protéger ultérieurement.
 */
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("[GET /api/admin/reviews] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des avis." },
      { status: 500 }
    );
  }
}
