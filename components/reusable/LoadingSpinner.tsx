"use client";

type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={
        "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin " +
        (className ?? "")
      }
      aria-hidden="true"
    />
  );
}
