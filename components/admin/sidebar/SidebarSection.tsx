import { type ReactNode } from "react";

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="px-3 py-2">
      {title && (
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-300">
          {title}
        </p>
      )}
      <nav className="flex flex-col gap-1">{children}</nav>
    </div>
  );
}
