"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type StaffUser = {
  email: string;
  role: string;
};

export default function useStaffUser(pathname: string) {
  const router = useRouter();

  const [user, setUser] = useState<StaffUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/me", { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) setUser(null);
          return;
        }
        const data = await res.json();
        if (!cancelled) setUser(data?.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!profileOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!profileRef.current) return;
      if (!profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [profileOpen]);

  const isStaff = user?.role === "ADMIN" || user?.role === "MODERATOR";

  const initials = useMemo(() => {
    const src = user?.email?.trim() || "";
    if (!src) return "A";
    const beforeAt = src.split("@")[0] ?? src;
    const parts = beforeAt.split(/[._\-\s]+/).filter(Boolean);
    const first = (parts[0]?.[0] ?? beforeAt[0] ?? "A").toUpperCase();
    const second = (parts[1]?.[0] ?? beforeAt[1] ?? "").toUpperCase();
    return `${first}${second}`;
  }, [user?.email]);

  const onLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setProfileOpen(false);
      setUser(null);
      router.refresh();
    }
  };

  return {
    user,
    isStaff,
    initials,
    profileOpen,
    setProfileOpen,
    profileRef,
    onLogout,
  };
}
