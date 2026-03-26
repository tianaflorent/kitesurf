"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Login page gets no sidebar
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  // Sidebar is now shown for all admin routes, filtering logic inside the sidebar.
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content — offset by sidebar width on desktop */}
      <main className={`min-h-screen transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
