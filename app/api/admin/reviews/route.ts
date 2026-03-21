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
    const message = error instanceof Error ? error.message : String(error);
    const isDbUnavailable =
      message.includes("Server selection timeout") ||
      message.includes("No available servers") ||
      message.includes("ReplicaSetNoPrimary") ||
      message.includes("received fatal alert") ||
      message.includes("ECONN") ||
      message.includes("timed out");

    console.error("[GET /api/admin/reviews] Erreur :", message);

    if (isDbUnavailable) {
      return NextResponse.json(
        { error: "Base de données indisponible." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des avis." },
      { status: 500 }
    );
  }
}
