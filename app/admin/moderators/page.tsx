"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  Send,
  Pencil,
  Trash2,
  X,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

interface Moderator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  inviteStatus: string;
  invitedAt: string | null;
  createdAt: string;
}

type ModalMode = "create" | "edit" | null;

const STATUS_THEME: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: "En attente", color: "text-orange-600", bg: "bg-orange-50" },
  ACCEPTED: { label: "Actif", color: "text-emerald-600", bg: "bg-emerald-50" },
};

export default function AdminModeratorsPage() {
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingMod, setEditingMod] = useState<Moderator | null>(null);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const fetchModerators = async () => {
    try {
      const res = await fetch("/api/admin/moderators");
      if (!res.ok) throw new Error("Erreur de chargement");
      const data: Moderator[] = await res.json();
      setModerators(data);
    } catch {
      toast.error("Erreur lors du chargement des modérateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModerators();
  }, []);

  const openCreateModal = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setEditingMod(null);
    setModalMode("create");
  };

  const openEditModal = (mod: Moderator) => {
    setFirstName(mod.firstName);
    setLastName(mod.lastName);
    setEmail(mod.email);
    setEditingMod(mod);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingMod(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setActionLoading("form");

    try {
      if (modalMode === "create") {
        const res = await fetch("/api/admin/moderators", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Erreur lors de la création");
        }

        toast.success("Modérateur créé avec succès.");
      } else if (modalMode === "edit" && editingMod) {
        const res = await fetch(`/api/admin/moderators/${editingMod.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Erreur lors de la mise à jour");
        }

        toast.success("Modérateur mis à jour.");
      }

      closeModal();
      await fetchModerators();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (mod: Moderator) => {
    if (!confirm(`Supprimer ${mod.firstName} ${mod.lastName} ?`)) return;
    setActionLoading(mod.id + "DELETE");

    try {
      const res = await fetch(`/api/admin/moderators/${mod.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Erreur de suppression");
      }

      toast.success("Modérateur supprimé.");
      await fetchModerators();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendInvite = async (mod: Moderator) => {
    setActionLoading(mod.id + "INVITE");

    try {
      const res = await fetch(`/api/admin/moderators/${mod.id}/invite`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Erreur d'envoi");
      }

      toast.success("Invitation envoyée !");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const busy = actionLoading !== null;

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Modérateurs
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Gérez les comptes modérateurs et les invitations.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-sm cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Inviter un modérateur
        </button>
      </header>

      {/* Content */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-white rounded-xl border border-slate-100"
            />
          ))}
        </div>
      ) : moderators.length === 0 ? (
        <div className="py-24 flex flex-col items-center text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white">
          <Users className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="text-slate-900 font-medium">
            Aucun modérateur
          </h3>
          <p className="text-slate-400 text-sm">
            Commencez par inviter un modérateur.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_120px_180px] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Nom</span>
            <span>Email</span>
            <span>Statut</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Table rows */}
          {moderators.map((mod) => {
            const theme = STATUS_THEME[mod.inviteStatus] || STATUS_THEME.PENDING;
            const isRowBusy = actionLoading?.startsWith(mod.id);

            return (
              <div
                key={mod.id}
                className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_180px] gap-4 items-center px-6 py-4 border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition ${
                  isRowBusy ? "opacity-60" : ""
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
                      onClick={() => handleSendInvite(mod)}
                      disabled={busy}
                      className="h-8 px-3 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Envoyer l'invitation"
                    >
                      <Send className="w-3 h-3" />
                      Inviter
                    </button>
                  )}
                  <button
                    onClick={() => openEditModal(mod)}
                    disabled={busy}
                    className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Modifier"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(mod)}
                    disabled={busy}
                    className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalMode && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  {modalMode === "create"
                    ? "Inviter un modérateur"
                    : "Modifier le modérateur"}
                </h2>
                <button
                  onClick={closeModal}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Prénom
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Nom
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@email.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === "form"}
                    className="px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "form"
                      ? "Chargement..."
                      : modalMode === "create"
                        ? "Créer"
                        : "Enregistrer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
