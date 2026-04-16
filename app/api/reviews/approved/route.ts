import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleDbError } from "@/lib/db-error";

/**
 * GET /api/reviews/approved
 * Retourne uniquement les avis approuvés, triés du plus récent au plus ancien.
 */
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        comment: true,
        rating: true,
        createdAt: true,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return handleDbError(error, "[GET /api/reviews/approved]", "Erreur serveur lors de la récupération des avis.");
  }
}
