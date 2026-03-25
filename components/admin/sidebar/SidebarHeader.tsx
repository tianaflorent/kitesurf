"use client";

import {  X } from "lucide-react";
import Image from "next/image";

interface SidebarHeaderProps {
  onClose?: () => void;
  collapsed?: boolean;
}

export default function SidebarHeader({ onClose, collapsed }: SidebarHeaderProps) {
  return (
    <div className={`flex items-center px-5 py-5 border-b border-slate-100 ${collapsed ? "justify-center" : "justify-between"}`}>
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-20 shrink-0 rounded-xl -white flex items-center justify-center transition-all">
          <Image
                  src="/images/IMG-20260318-WA0001.jpg"
                  alt="Kite School Logo"
                  width={90}
                  height={90}
                  className="object-contain"
                  priority
                />
        </div>
        {!collapsed && (
          <div className="truncate">
            <p className="text-md font-bold text-slate-900 tracking-tight">Admin</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Purewind</p>
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden h-8 w-8 shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
          aria-label="Fermer le menu"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
