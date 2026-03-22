"use client";

import { useEffect, useState } from "react";
import {
  Check,
  X,
  Clock,
  Trash2,
  Star,
  Mail,
  MoreHorizontal,
  Inbox,
  Filter,
} from "lucide-react";
import { Review, ReviewStatus } from "@/lib/types";
import toast from "react-hot-toast";

// --- Types & Config ---

const STATUS_THEME: Record<ReviewStatus, { label: string; color: string; bg: string }> = {
  PENDING: { label: "À modérer", color: "text-orange-600", bg: "bg-orange-50" },
  APPROVED: { label: "Publié", color: "text-emerald-600", bg: "bg-emerald-50" },
  REJECTED: { label: "Rejeté", color: "text-slate-400", bg: "bg-slate-50" },
};

type FilterType = ReviewStatus | "ALL";

// --- Sub-components ---

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
            }`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Erreur de chargement");
      }
      const data = await res.json();
      setReviews(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur de chargement";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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

      await fetchReviews();
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

      await fetchReviews();
      toast.success("Avis supprimé.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur de suppression";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  // Simulation fetch (à adapter avec ton API)
  useEffect(() => {
    fetchReviews();
  }, []);

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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header - Plus minimaliste */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Avis clients</h1>
            <p className="text-slate-500 mt-1 text-sm">Gérez et modérez les retours d'expérience utilisateurs.</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200/60">
            {(["ALL", "PENDING", "APPROVED", "REJECTED"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeFilter === f
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

        {/* Content */}
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-50 rounded-xl border border-slate-100" />)}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center border-2 border-dashed border-slate-100 rounded-3xl">
            <Inbox className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="text-slate-900 font-medium">Aucun avis trouvé</h3>
            <p className="text-slate-400 text-sm">Il n'y a pas d'avis correspondant à ce filtre.</p>
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
    </div>
  );
}

// --- Row Component pour plus de propreté ---

function ReviewRow({
  review,
  actionLoading,
  onApprove,
  onReject,
  onDelete,
}: {
  review: Review;
  actionLoading: string | null;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}) {
  const theme = STATUS_THEME[review.status as ReviewStatus];
  const busy = actionLoading !== null;
  const isRowBusy =
    actionLoading === review.id + "APPROVED" ||
    actionLoading === review.id + "REJECTED" ||
    actionLoading === review.id + "DELETE";

  return (
    <div className={`group relative bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-slate-300 hover:shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] ${isRowBusy ? "opacity-70" : ""}`}>
      <div className="flex flex-col md:flex-row gap-6">

        {/* Left: User Info */}
        <div className="w-full md:w-48 shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white uppercase">
              {review.name.substring(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{review.name}</p>
              <div className="flex items-center gap-1 text-slate-400">
                <Mail className="w-3 h-3" />
                <span className="text-[11px] truncate">{review.email || "No email"}</span>
              </div>
            </div>
          </div>
          <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${theme.bg} ${theme.color}`}>
            {theme.label}
          </div>
        </div>

        {/* Center: Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <StarRating rating={review.rating} />
            <span className="text-[11px] text-slate-400">
              {new Date(review.createdAt).toLocaleDateString("fr-FR", { dateStyle: "medium" })}
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-4">
            "{review.comment}"
          </p>
        </div>

        {/* Right: Actions - Apparaissent subtilement au hover sur desktop */}
        <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
          <button
            onClick={onApprove}
            disabled={busy}
            className="h-9 px-4 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 cursor-pointer"
            title="Approuver"
          >
            <Check className="w-3.5 h-3.5" /> Approuver
          </button>
          <div className="flex gap-2">
            <button
              onClick={onReject}
              disabled={busy}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Rejeter"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              disabled={busy}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}