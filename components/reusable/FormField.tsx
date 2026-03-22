"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  optionalText?: string;
  icon?: LucideIcon;
  error?: string;
  children: ReactNode;
};

export default function FormField({ label, optionalText, icon: Icon, error, children }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2">
        {Icon ? <Icon className="w-3.5 h-3.5 opacity-50" aria-hidden="true" /> : null}
        <span>{label}</span>
        {optionalText ? (
          <span className="text-slate-400 font-normal text-xs">{optionalText}</span>
        ) : null}
      </label>
      {children}
      {error ? <p className="text-[11px] text-red-500 font-medium">{error}</p> : null}
    </div>
  );
}
