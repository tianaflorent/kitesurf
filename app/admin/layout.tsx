"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page gets no sidebar
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      {/* Main content — offset by sidebar width on desktop */}
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
