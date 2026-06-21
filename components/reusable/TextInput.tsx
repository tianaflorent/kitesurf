"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(props, ref) {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      className={
        "w-full px-5 py-4 pr-12 bg-transparent border border-border rounded-[var(--radius)] text-sm transition-all focus:border-primary outline-none placeholder:text-muted-foreground/50 font-light " +
        (className ?? "")
      }
      {...rest}
    />
  );
});

export default TextInput;
