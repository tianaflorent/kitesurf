import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateReviewPayload } from "@/lib/types";

/**
 * POST /api/reviews
 * Crée un nouvel avis avec le statut PENDING (en attente de modération).
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateReviewPayload = await request.json();

    const { name, firstName, lastName, email, comment, rating } = body;

    // Validation des champs obligatoires
    if (!name || !comment || !rating) {
      return NextResponse.json(
        { error: "Les champs nom, commentaire et note sont obligatoires." },
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
        name: name.trim(),
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
    const message = error instanceof Error ? error.message : String(error);
    const isDbUnavailable =
      message.includes("Server selection timeout") ||
      message.includes("No available servers") ||
      message.includes("ReplicaSetNoPrimary") ||
      message.includes("received fatal alert") ||
      message.includes("ECONN") ||
      message.includes("timed out");

    const isTransactionsUnsupported = message.includes(
      "Transactions are not supported by this deployment"
    );

    console.error("[POST /api/reviews] Erreur :", message);

    if (isDbUnavailable) {
      return NextResponse.json(
        { error: "Base de données indisponible." },
        { status: 503 }
      );
    }

    if (isTransactionsUnsupported) {
      return NextResponse.json(
        { error: "La base de données ne supporte pas les transactions." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Erreur serveur lors de la création de l'avis." },
      { status: 500 }
    );
  }
}
