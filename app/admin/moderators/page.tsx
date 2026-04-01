"use client";

import { useState } from "react";
import {
  UserPlus,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import useSWR from "swr";
import ModeratorRow from "@/components/admin/ModeratorRow";
import ModeratorFormModal from "@/components/admin/ModeratorFormModal";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Erreur de chargement");
  return res.json();
});

interface Moderator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  inviteStatus: string;
  invitedAt: string | null;
  createdAt: string;
}

type ModalMode = "create" | "edit" | "delete" | null;



export default function AdminModeratorsPage() {
  const { data: moderators = [], error, isLoading, mutate } = useSWR<Moderator[]>("/api/admin/moderators", fetcher);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingMod, setEditingMod] = useState<Moderator | null>(null);

  const openCreateModal = () => {
    setEditingMod(null);
    setModalMode("create");
  };

  const openEditModal = (mod: Moderator) => {
    setEditingMod(mod);
    setModalMode("edit");
  };

  const handleDeleteRequest = (mod: Moderator) => {
    setEditingMod(mod);
    setModalMode("delete");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingMod(null);
  };

  const handleSubmit = async (values: { firstName: string; lastName: string; email: string }) => {
    setActionLoading("form");

    try {
      if (modalMode === "create") {
        const res = await fetch("/api/admin/moderators", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.error ?? "Erreur lors de la création");
        }

        if (data?.warning) {
          toast.error(data.warning, { duration: 6000 });
        } else {
          toast.success("Modérateur créé et invitation envoyée.");
        }
      } else if (modalMode === "edit" && editingMod) {
        const res = await fetch(`/api/admin/moderators/${editingMod.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Erreur lors de la mise à jour");
        }

        toast.success("Modérateur mis à jour.");
      }

      closeModal();
      await mutate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };



  const confirmDelete = async () => {
    if (!editingMod) return;

    setActionLoading(editingMod.id + "DELETE");

    try {
      const res = await fetch(`/api/admin/moderators/${editingMod.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Erreur de suppression");
      }

      toast.success("Modérateur supprimé.");
      closeModal();
      await mutate();
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
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-white rounded-xl border border-slate-100"
            />
          ))}
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500 bg-white border border-slate-200 rounded-2xl">
          Erreur lors du chargement des modérateurs.
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
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_120px_180px] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Nom</span>
            <span>Email</span>
            <span>Statut</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Table rows */}
          {moderators.map((mod) => (
            <ModeratorRow
              key={mod.id}
              mod={mod}
              busy={busy}
              actionLoading={actionLoading}
              onSendInvite={() => handleSendInvite(mod)}
              onEdit={() => openEditModal(mod)}
              onDelete={() => handleDeleteRequest(mod)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ModeratorFormModal
        mode={modalMode === "delete" ? "delete" : modalMode === "edit" ? "edit" : "create"}
        moderator={editingMod}
        isOpen={!!modalMode}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={confirmDelete}
        actionLoading={actionLoading}
      />
    </div>
  );
}
