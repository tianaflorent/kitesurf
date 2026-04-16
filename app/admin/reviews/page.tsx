"use client";

import { useState } from "react";
import {
  Inbox
} from "lucide-react";
import { Review, ReviewStatus } from "@/lib/types";
import toast from "react-hot-toast";
import useSWR from "swr";
import ReviewRow from "@/components/admin/ReviewRow";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Erreur de chargement");
  return res.json();
});


const STATUS_THEME: Record<ReviewStatus, { label: string; color: string; bg: string }> = {
  PENDING: { label: "À modérer", color: "text-orange-600", bg: "bg-orange-50" },
  APPROVED: { label: "Publié", color: "text-emerald-600", bg: "bg-emerald-50" },
  REJECTED: { label: "Rejeté", color: "text-slate-400", bg: "bg-slate-50" },
};

type FilterType = ReviewStatus | "ALL";




export default function AdminReviewsPage() {
  const { data: reviews = [], error, isLoading, mutate } = useSWR<Review[]>("/api/admin/reviews", fetcher);
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const updateStatus = async (id: string, status: ReviewStatus) => {
    setActionLoading(id + status);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Échec de la mise à jour");
      }

      await mutate();
      toast.success(
        status === "APPROVED"
          ? "Avis approuvé."
          : status === "REJECTED"
            ? "Avis rejeté."
            : "Avis mis à jour."
      );
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur de mise à jour";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement cet avis ?")) return;
    setActionLoading(id + "DELETE");
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Échec de la suppression");
      }

      await mutate();
      toast.success("Avis supprimé.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur de suppression";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };



  const counts = {
    ALL: reviews.length,
    PENDING: reviews.filter(r => r.status === "PENDING").length,
    APPROVED: reviews.filter(r => r.status === "APPROVED").length,
    REJECTED: reviews.filter(r => r.status === "REJECTED").length,
  };

  const filteredReviews = activeFilter === "ALL"
    ? reviews
    : reviews.filter(r => r.status === activeFilter);

  return (
    <div className="min-h-screen font-sans">

        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Avis clients</h1>
            <p className="text-slate-500 mt-1 text-sm">Gérez et modérez les retours d&apos;expérience utilisateurs.</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200/60">
            {(["ALL", "PENDING", "APPROVED", "REJECTED"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${activeFilter === f
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {f === "ALL" ? "Tous" : STATUS_THEME[f as ReviewStatus].label}
                <span className="ml-2 opacity-50 font-normal">{counts[f]}</span>
              </button>
            ))}
          </div>
        </header>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-50 rounded-xl border border-slate-100" />)}
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">
            Erreur lors du chargement des avis.
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center border-2 border-dashed border-slate-100 rounded-3xl">
            <Inbox className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="text-slate-900 font-medium">Aucun avis trouvé</h3>
            <p className="text-slate-400 text-sm">Il n&apos;y a pas d&apos;avis correspondant à ce filtre.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredReviews.map((review) => (
              <ReviewRow
                key={review.id}
                review={review}
                actionLoading={actionLoading}
                onApprove={() => updateStatus(review.id, "APPROVED")}
                onReject={() => updateStatus(review.id, "REJECTED")}
                onDelete={() => deleteReview(review.id)}
              />
            ))}
          </div>
        )}
    </div>
  );
}
