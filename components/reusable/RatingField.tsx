"use client";

import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import StarRating from "./StarRating";

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  error?: string;
  label: string;
};

export default function RatingField<TFieldValues extends FieldValues>({
  control,
  name,
  error,
  label,
}: Props<TFieldValues>) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{ required: true, min: 1 }}
        render={({ field }) => (
          <StarRating
            rating={field.value as number}
            interactive
            size={36}
            onChange={field.onChange}
            hover={hover}
            onHoverChange={setHover}
          />
        )}
      />
      {error ? (
        <p className="text-[11px] text-red-500 mt-2 font-medium animate-pulse">{error}</p>
      ) : null}
    </div>
  );
}
