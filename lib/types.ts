import type { Review as PrismaReview, ReviewStatus } from "./prisma-client/client";

// Re-export pour l'utilisation dans le frontend
export type { ReviewStatus };

// Surcharge légère pour autoriser Date | string côté frontend (sérialisation JSON)
export interface Review extends Omit<PrismaReview, "createdAt" | "updatedAt"> {
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateReviewPayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  comment: string;
  rating: number;
}
