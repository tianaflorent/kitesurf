import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateReviewPayload } from "@/lib/types";
import { handleDbError } from "@/lib/db-error";

/**
 * POST /api/reviews
 * Crée un nouvel avis avec le statut PENDING (en attente de modération).
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateReviewPayload = await request.json();

    const { name, firstName, lastName, email, comment, rating } = body;

    // Validation des champs obligatoires
    if (!comment || !rating) {
      return NextResponse.json(
        { error: "Les champs commentaire et note sont obligatoires." },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "La note doit être entre 1 et 5." },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name: name?.trim() || "Anonyme",
        firstName: firstName?.trim() || null,
        lastName: lastName?.trim() || null,
        email: email?.trim() || null,
        comment: comment.trim(),
        rating,
        status: "PENDING",
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return handleDbError(error, "[POST /api/reviews]", "Erreur serveur lors de la création de l'avis.");
  }
}
