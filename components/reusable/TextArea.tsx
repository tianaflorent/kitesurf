"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(props, ref) {
  const { className, ...rest } = props;
  return (
    <textarea
      ref={ref}
      className={
        "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm transition-all focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none resize-none " +
        (className ?? "")
      }
      {...rest}
    />
  );
});

export default TextArea;
