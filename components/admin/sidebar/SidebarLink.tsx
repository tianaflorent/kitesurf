"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  badge?: number;
  onClick?: () => void;
}

export default function SidebarLink({
  href,
  label,
  icon: Icon,
  isActive,
  badge,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        isActive
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon
        className={`w-4.5 h-4.5 shrink-0 ${
          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
        }`}
      />
      <span className="truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
