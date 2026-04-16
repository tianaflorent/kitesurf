"use client";

import { Check, X, Trash2, Mail } from "lucide-react";
import { Review, ReviewStatus } from "@/lib/types";
import StarRating from "@/components/reusable/StarRating";

const STATUS_THEME: Record<ReviewStatus, { label: string; color: string; bg: string }> = {
  PENDING: { label: "À modérer", color: "text-orange-600", bg: "bg-orange-50" },
  APPROVED: { label: "Publié", color: "text-emerald-600", bg: "bg-emerald-50" },
  REJECTED: { label: "Rejeté", color: "text-slate-400", bg: "bg-slate-50" },
};

interface ReviewRowProps {
  review: Review;
  actionLoading: string | null;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}

export default function ReviewRow({
  review,
  actionLoading,
  onApprove,
  onReject,
  onDelete,
}: ReviewRowProps) {
  const theme = STATUS_THEME[review.status];
  const busy = actionLoading !== null;
  const isRowBusy =
    actionLoading === review.id + "APPROVED" ||
    actionLoading === review.id + "REJECTED" ||
    actionLoading === review.id + "DELETE";

  return (
    <div className={`group relative bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-slate-300 hover:shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] ${isRowBusy ? "opacity-70" : ""}`}>
      <div className="flex flex-col md:flex-row gap-6">

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

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <StarRating rating={review.rating} size={12} />
            <span className="text-[11px] text-slate-400">
              {new Date(review.createdAt).toLocaleDateString("fr-FR", { dateStyle: "medium" })}
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-4">
            &ldquo;{review.comment}&rdquo;
          </p>
        </div>

        <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
          <button
            onClick={onApprove}
            disabled={busy || review.status === "APPROVED"}
            className={`h-9 px-4 text-xs font-semibold text-white rounded-lg transition-colors flex items-center gap-2 ${busy || review.status === "APPROVED"
                ? "bg-green-600 opacity-50 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
              }`}
            title="Approuver"
          >
            <Check className="w-3.5 h-3.5" /> Approuver
          </button>
          <div className="flex gap-2">
            {review.email && (
              <a
                href={`mailto:${review.email}`}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                title="Envoyer un email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
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
