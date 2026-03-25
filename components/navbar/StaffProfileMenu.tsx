"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { StaffUser } from "@/app/hooks/useStaffUser";

type Props = {
  user: StaffUser | null;
  initials: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onLogout: () => Promise<void>;
};

export default function StaffProfileMenu({
  user,
  initials,
  open,
  setOpen,
  onLogout,
}: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative h-10 w-10 rounded-full bg-blue-700 text-white font-bold shadow-md flex items-center justify-center select-none cursor-pointer"
        aria-label="Profil"
      >
        {initials}
        <span
          className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user?.role}</p>
          </div>
          <div className="p-2">
            <Link
              href="/admin/reviews"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
