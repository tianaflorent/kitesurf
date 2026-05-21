"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { StaffUser } from "@/app/hooks/useStaffUser";
import { useLanguage } from "@/context/LanguageContext";
import { dictionaries } from "@/context/translations";

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
  const t = dictionaries[lang].home;

  const menuPosition = variant === "navbar" 
    ? "absolute right-0 mt-4" 
    : "absolute bottom-full left-0 mb-4";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`group/profile flex items-center transition-all cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
          variant === "navbar" 
            ? "h-11 w-11 justify-center" 
            : "w-full p-2 rounded-none hover:bg-muted/50 gap-4"
        }`}
        aria-label="Profil"
      >
        {/* Monogramme carré style "Sceau" */}
        <div className={`relative shrink-0 flex items-center justify-center bg-primary text-primary-foreground font-medium tracking-widest transition-transform duration-300 group-hover/profile:bg-primary/90 rounded-none ${
          variant === "navbar" 
            ? "h-11 w-11 text-sm shadow-sm" 
            : "h-10 w-10 text-xs shadow-sm"
        }`}>
          {initials}
          <span
            className="absolute -right-1 -bottom-1 h-3 w-3 rounded-none bg-secondary ring-2 ring-background"
            aria-hidden="true"
          />
        </div>
        
        {variant === "sidebar" && user && (
          <div className="flex flex-col text-left min-w-0 overflow-hidden">
            <p className="text-sm font-medium tracking-wide text-foreground uppercase truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs font-light text-muted-foreground truncate mt-0.5">
              {user.email}
            </p>
          </div>
        )}
      </button>

      {open ? (
        <div className={`z-50 w-56 rounded-none border border-border bg-background shadow-2xl overflow-hidden ${menuPosition}`}>
          <div className="px-5 py-4 border-b border-border/50 bg-muted/20">
            <p className="text-sm font-medium tracking-wide text-foreground truncate">{user?.email}</p>
            <p className="text-xs font-light uppercase tracking-widest text-muted-foreground mt-1">{user?.role}</p>
          </div>
          <div className="p-2">
            <Link
              href="/admin/reviews"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-none text-sm font-light tracking-wide text-foreground hover:bg-muted transition-colors"
            >
              <LayoutDashboard size={16} strokeWidth={1.5} className="text-muted-foreground" />
              {t.dashboard}
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-none text-sm font-light tracking-wide text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              <LogOut size={16} strokeWidth={1.5} />
              {t.logout}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}