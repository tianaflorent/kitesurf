"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { StaffUser } from "@/app/hooks/useStaffUser";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

type Props = {
  user: StaffUser | null;
  initials: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onLogout: () => Promise<void>;
  variant?: "navbar" | "sidebar";
};

export default function StaffProfileMenu({
  user,
  initials,
  open,
  setOpen,
  onLogout,
  variant = "navbar",
}: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const menuPosition = variant === "navbar" 
    ? "absolute right-0 mt-3" 
    : "absolute bottom-full left-0 mb-3";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`group/profile flex items-center transition-all cursor-pointer select-none outline-none ${
          variant === "navbar" 
            ? "h-10 w-10 justify-center rounded-full" 
            : "w-full p-1 -m-1 rounded-xl hover:bg-slate-50 gap-3"
        }`}
        aria-label="Profil"
      >
        <div className={`relative shrink-0 flex items-center justify-center text-white font-bold transition-transform group-hover/profile:scale-105 rounded-full ${
          variant === "navbar" 
            ? "h-10 w-10 bg-blue-700 shadow-md" 
            : "h-9 w-9 bg-blue-700 shadow-sm text-xs"
        }`}>
          {initials}
          <span
            className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"
            aria-hidden="true"
          />
        </div>
        
        {variant === "sidebar" && user && (
          <div className="flex flex-col text-left min-w-0 overflow-hidden">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[13px] text-slate-500 truncate">
              {user.email}
            </p>
          </div>
        )}
      </button>

      {open ? (
        <div className={`z-50 w-52 rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden ${menuPosition}`}>
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
              {t.dashboard}
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <LogOut size={16} />
              {t.logout}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
