"use client";

import { Shield, X } from "lucide-react";

interface SidebarHeaderProps {
  onClose?: () => void;
}

export default function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
          <Shield className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 tracking-tight">Admin</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Purewind</p>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
          aria-label="Fermer le menu"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
