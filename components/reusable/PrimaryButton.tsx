"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = forwardRef<HTMLButtonElement, Props>(function PrimaryButton(props, ref) {
  const { className, ...rest } = props;
  return (
    <button
      ref={ref}
      className={
        "w-full group relative cursor-pointer flex items-center justify-center gap-2 bg-blue-800 text-white py-4 rounded-xl font-semibold transition-all hover:bg-blue-900 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none " +
        (className ?? "")
      }
      {...rest}
    />
  );
});

export default PrimaryButton;
