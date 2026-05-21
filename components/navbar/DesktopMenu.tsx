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
    <nav className="hidden lg:flex items-center gap-8">
      {items.map((menu) => {
        const Icon = menu.icon;
        const active = pathname === menu.href;

        return (
          <Link
            key={menu.name}
            href={menu.href}
            className={`group flex items-center gap-2 relative py-2 text-xs uppercase tracking-[0.15em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
              active 
                ? "text-foreground font-medium" 
                : "text-muted-foreground font-light hover:text-foreground"
            }`}
          >
            {/* Icônes allégées pour ne pas surcharger le style éditorial */}
            <Icon size={15} strokeWidth={1.5} className={active ? "text-secondary" : "transition-colors group-hover:text-secondary"} />
            {menu.name}

            {/* Soulignement élégant et fin */}
            <span
              className={`absolute -bottom-1 left-0 h-[1px] bg-secondary transition-all duration-500 ease-out ${
                active ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}