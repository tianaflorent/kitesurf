"use client";

import { Send, Pencil, Trash2 } from "lucide-react";

interface Moderator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  inviteStatus: string;
  invitedAt: string | null;
  createdAt: string;
}

const STATUS_THEME: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: "En attente", color: "text-orange-600", bg: "bg-orange-50" },
  ACCEPTED: { label: "Actif", color: "text-emerald-600", bg: "bg-emerald-50" },
};

interface ModeratorRowProps {
  mod: Moderator;
  busy: boolean;
  actionLoading: string | null;
  onSendInvite: (mod: Moderator) => void;
  onEdit: (mod: Moderator) => void;
  onDelete: (mod: Moderator) => void;
}

export default function ModeratorRow({
  mod,
  busy,
  actionLoading,
  onSendInvite,
  onEdit,
  onDelete,
}: ModeratorRowProps) {
  const theme = STATUS_THEME[mod.inviteStatus] || STATUS_THEME.PENDING;
  const isRowBusy = actionLoading?.startsWith(mod.id);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_180px] gap-4 items-center px-6 py-4 border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition ${isRowBusy ? "opacity-60" : ""
        }`}
    >
      {/* Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-[11px] font-bold text-white uppercase shrink-0">
          {mod.firstName.charAt(0)}
          {mod.lastName.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-slate-900 truncate">
          {mod.firstName} {mod.lastName}
        </span>
      </div>

      {/* Email */}
      <span className="text-sm text-slate-500 truncate">
        {mod.email}
      </span>

      {/* Status */}
      <div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${theme.bg} ${theme.color}`}
        >
          {theme.label}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        {mod.inviteStatus === "PENDING" && (
          <button
            onClick={() => onSendInvite(mod)}
            disabled={busy}
            className="h-8 px-3 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Renvoyer l'invitation"
          >
            <Send className="w-3 h-3" />
            Renvoyer
          </button>
        )}
        <button
          onClick={() => onEdit(mod)}
          disabled={busy}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          title="Modifier"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(mod)}
          disabled={busy}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          title="Supprimer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
