"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(props, ref) {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      className={
        "w-full px-4 py-3 pr-12 bg-white border border-slate-200 rounded-xl text-sm transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none " +
        (className ?? "")
      }
      {...rest}
    />
  );
});

export default TextInput;
