"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export type StaffUser = {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.user as StaffUser | null;
};

export default function useStaffUser(pathname: string) {
  const router = useRouter();

  const { data: user = null, mutate } = useSWR<StaffUser | null>("/api/admin/me", fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

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
      await mutate(null, false);
    } finally {
      setProfileOpen(false);
      router.refresh();
      router.push("/admin/login");
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
