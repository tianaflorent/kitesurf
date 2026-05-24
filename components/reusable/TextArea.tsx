"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(props, ref) {
  const { className, ...rest } = props;
  return (
    <textarea
      ref={ref}
      className={
        "w-full px-5 py-4 bg-transparent border border-border rounded-none text-sm transition-all focus:border-primary outline-none placeholder:text-muted-foreground/50 resize-none font-light " +
        (className ?? "")
      }
      {...rest}
    />
  );
});

export default TextArea;
