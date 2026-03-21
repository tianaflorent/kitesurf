"use client";

import { useEffect, useState } from "react";
import { Review, ReviewStatus } from "@/lib/types";

const STATUS_LABELS: Record<ReviewStatus, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Rejeté",
};

const STATUS_COLORS: Record<ReviewStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-700",
};

type Filter = ReviewStatus | "ALL";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      if (!res.ok) throw new Error("Erreur de chargement");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("[Admin] Erreur de chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id: string, status: ReviewStatus) => {
    setActionLoading(id + status);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Échec de la mise à jour");
      await fetchReviews();
    } catch (err) {
      console.error("[Admin] Erreur de mise à jour :", err);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement cet avis ?")) return;
    setActionLoading(id + "DELETE");
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Échec de la suppression");
      await fetchReviews();
    } catch (err) {
      console.error("[Admin] Erreur de suppression :", err);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = filter === "ALL" ? reviews : reviews.filter((r) => r.status === filter);

  const counts: Record<Filter, number> = {
    ALL: reviews.length,
    PENDING: reviews.filter((r) => r.status === "PENDING").length,
    APPROVED: reviews.filter((r) => r.status === "APPROVED").length,
    REJECTED: reviews.filter((r) => r.status === "REJECTED").length,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-900">Modération des avis</h1>
          <p className="text-gray-500 mt-1">
            Interface d&rsquo;administration — gérez les avis soumis par les visiteurs.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition border ${
                filter === f
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {f === "ALL" ? "Tous" : STATUS_LABELS[f]}{" "}
              <span className="ml-1 opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>

        {/* Liste */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse py-20">Chargement...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Aucun avis dans cette catégorie.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                  {/* Infos de l'avis */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      {/* Badge statut */}
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                          STATUS_COLORS[review.status as ReviewStatus]
                        }`}
                      >
                        {STATUS_LABELS[review.status as ReviewStatus]}
                      </span>

                      {/* Note */}
                      <span className="text-yellow-500 text-sm">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                      </span>

                      {/* Date */}
                      <span className="text-gray-400 text-xs">
                        {new Date(review.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Pseudo */}
                    <p className="font-semibold text-gray-800 truncate">{review.name}</p>

                    {/* Infos privées (prénom, nom, email) */}
                    {(review.firstName || review.lastName || review.email) && (
                      <div className="text-xs text-gray-400 mt-0.5 space-x-2">
                        {(review.firstName || review.lastName) && (
                          <span>
                            {[review.firstName, review.lastName].filter(Boolean).join(" ")}
                          </span>
                        )}
                        {review.email && (
                          <span>— <a href={`mailto:${review.email}`} className="underline hover:text-blue-600">{review.email}</a></span>
                        )}
                      </div>
                    )}

                    {/* Commentaire */}
                    <p className="text-gray-600 mt-3 italic leading-relaxed">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    {review.status !== "APPROVED" && (
                      <button
                        onClick={() => updateStatus(review.id, "APPROVED")}
                        disabled={actionLoading !== null}
                        className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition"
                      >
                        ✓ Approuver
                      </button>
                    )}
                    {review.status !== "REJECTED" && (
                      <button
                        onClick={() => updateStatus(review.id, "REJECTED")}
                        disabled={actionLoading !== null}
                        className="px-4 py-2 text-sm rounded-xl bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 transition"
                      >
                        ✕ Rejeter
                      </button>
                    )}
                    {review.status === "PENDING" && (
                      <button
                        onClick={() => updateStatus(review.id, "PENDING")}
                        disabled
                        className="hidden"
                      />
                    )}
                    <button
                      onClick={() => deleteReview(review.id)}
                      disabled={actionLoading !== null}
                      className="px-4 py-2 text-sm rounded-xl bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition"
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
