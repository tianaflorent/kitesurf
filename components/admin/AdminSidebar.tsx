"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquareText, Users, Menu, ChevronLeft, ChevronRight, Home } from "lucide-react";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarSection from "./sidebar/SidebarSection";
import SidebarLink from "./sidebar/SidebarLink";
import useStaffUser from "@/app/hooks/useStaffUser";
import StaffProfileMenu from "@/components/navbar/StaffProfileMenu";

const MENU_ITEMS = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/admin/reviews", label: "Avis", icon: MessageSquareText },
  { href: "/admin/moderators", label: "Modérateurs", icon: Users },
];

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (b: boolean) => void;
}

export default function AdminSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    user,
    initials,
    profileOpen,
    setProfileOpen,
    profileRef,
    onLogout,
  } = useStaffUser(pathname);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Handle mobile drawer clicking (always behaves as expanded)
  const renderContent = (isMobile: boolean) => {
    const isCollapsed = !isMobile && collapsed;
    
    const visibleItems = MENU_ITEMS.filter(item => {
      if (item.label === "Modérateurs" && user?.role === "MODERATOR") return false;
      return true;
    });

    return (
      <div className={`flex flex-col h-full ${!isCollapsed ? 'overflow-hidden' : 'overflow-visible'}`}>
        <SidebarHeader onClose={isMobile ? () => setMobileOpen(false) : undefined} collapsed={isCollapsed} />

        <div className={`flex-1 py-2 ${!isCollapsed ? 'overflow-y-auto overflow-x-hidden' : 'overflow-visible'}`}>
          <SidebarSection title={isCollapsed ? "" : "Gestion"} collapsed={isCollapsed}>
            {visibleItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)}
                onClick={isMobile ? () => setMobileOpen(false) : undefined}
                collapsed={isCollapsed}
              />
            ))}
          </SidebarSection>
        </div>

        <div className={`p-4 border-t border-slate-100 flex ${isCollapsed ? 'flex-col items-center gap-4' : 'flex-row items-center justify-between'}`}>
          {/* Avatar and Menu */}
          <div className="relative" ref={profileRef}>
            <StaffProfileMenu
              user={user}
              initials={initials}
              open={profileOpen}
              setOpen={setProfileOpen}
              onLogout={onLogout}
            />
          </div>

          {/* Toggle for Desktop only */}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="lg:flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition"
              aria-label={collapsed ? "Agrandir le menu" : "Réduire le menu"}
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    );
  };

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
      <aside className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 bg-white border-r border-slate-100 z-40 transition-all duration-300 ${collapsed ? "lg:w-20" : "lg:w-64"}`}>
        {renderContent(false)}
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
            {renderContent(true)}
          </aside>
        </>
      )}
    </>
  );
}
