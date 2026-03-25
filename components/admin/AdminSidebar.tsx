"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquareText, Users, Menu } from "lucide-react";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarSection from "./sidebar/SidebarSection";
import SidebarLink from "./sidebar/SidebarLink";

const MENU_ITEMS = [
  { href: "/admin/reviews", label: "Avis", icon: MessageSquareText },
  { href: "/admin/moderators", label: "Modérateurs", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <SidebarHeader onClose={() => setMobileOpen(false)} />

      <div className="flex-1 overflow-y-auto py-2">
        <SidebarSection title="Gestion">
          {MENU_ITEMS.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={pathname.startsWith(item.href)}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </SidebarSection>
      </div>

      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-[10px] text-slate-300 text-center">
          © {new Date().getFullYear()} Purewind
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger trigger — mobile only */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-slate-600 hover:bg-slate-50 transition cursor-pointer"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-white border-r border-slate-100 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile overlay + drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl animate-slide-in-left">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
