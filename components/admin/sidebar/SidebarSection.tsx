import { type ReactNode } from "react";

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  collapsed?: boolean;
}

export default function SidebarSection({ title, children, collapsed }: SidebarSectionProps) {
  return (
    <div className={`px-3 py-2 flex flex-col ${collapsed ? 'items-center' : ''}`}>
      {title && !collapsed && (
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-300">
          {title}
        </p>
      )}
      <nav className="flex flex-col gap-1 w-full">{children}</nav>
    </div>
  );
}
