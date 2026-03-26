"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

type Props = {
  items: MenuItem[];
  pathname: string;
};

export default function DesktopMenu({ items, pathname }: Props) {
  return (
    <nav className="hidden lg:flex gap-5">
      {items.map((menu) => {
        const Icon = menu.icon;
        const active = pathname === menu.href;

        return (
          <Link
            key={menu.name}
            href={menu.href}
            className={`flex items-center gap-2 relative font-medium transition ${
              active ? "text-blue-700" : "text-gray-600 hover:text-blue-700"
            }`}
          >
            <Icon size={18} />
            {menu.name}

            <span
              className={`absolute -bottom-2 left-0 h-0.5 bg-blue-700 transition-all duration-300 ${
                active ? "w-full" : "w-0"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
