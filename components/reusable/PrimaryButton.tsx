"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = forwardRef<HTMLButtonElement, Props>(function PrimaryButton(props, ref) {
  const { className, ...rest } = props;
  return (
    <button
      ref={ref}
      className={
        "w-full group relative cursor-pointer flex items-center justify-center gap-4 bg-primary text-primary-foreground uppercase tracking-[0.2em] text-xs py-6 px-8 rounded-none font-medium transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none " +
        (className ?? "")
      }
      {...rest}
    />
  );
});

export default PrimaryButton;
