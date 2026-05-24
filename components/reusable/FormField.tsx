"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  optionalText?: string;
  icon?: LucideIcon;
  rightIcon?: ReactNode;
  error?: string;
  children: ReactNode;
};

export default function FormField({ label, optionalText, icon: Icon, rightIcon, error, children }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-sans uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2 mb-2">
        {Icon ? <Icon className="w-3.5 h-3.5 opacity-50" aria-hidden="true" /> : null}
        <span>{label}</span>
        {optionalText ? (
          <span className="text-muted-foreground/50 font-normal text-[10px] tracking-wider">{optionalText}</span>
        ) : null}
      </label>
      <div className="relative">
        {children}
        {rightIcon ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>
        ) : null}
      </div>
      {error ? <p className="text-xs text-red-500 font-light mt-2 tracking-wide">{error}</p> : null}
    </div>
  );
}
