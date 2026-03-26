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
  collapsed?: boolean;
}

export default function SidebarLink({
  href,
  label,
  icon: Icon,
  isActive,
  badge,
  onClick,
  collapsed,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative group flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        collapsed ? "justify-center" : "gap-3"
      } ${
        isActive
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon
        className={`w-4.5 h-4.5 shrink-0 transition-colors ${
          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
        }`}
      />
      
      {!collapsed && <span className="truncate">{label}</span>}
      
      {!collapsed && badge !== undefined && badge > 0 && (
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

      {/* CSS Tooltip on hover (only when collapsed) */}
      {collapsed && (
        <span className="absolute left-full ml-4 whitespace-nowrap px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-medium rounded-lg shadow-xl opacity-0 scale-95 origin-left group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all z-50">
          {label}
          
          {/* Small invisible gap filler to prevent hovering out if there's a gap */}
          <span className="absolute -inset-y-2 -left-4 w-4 bg-transparent" aria-hidden="true" />
          {/* Tooltip little triangle */}
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" aria-hidden="true" />
        </span>
      )}
    </Link>
  );
}
