export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Review {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  comment: string;
  rating: number;
  status: ReviewStatus;
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
