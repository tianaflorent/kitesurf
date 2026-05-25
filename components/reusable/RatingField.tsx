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
    <div className="flex flex-col items-center justify-center p-8 bg-muted/10 border border-border rounded-none mb-4">
      <label className="text-xs font-sans uppercase tracking-[0.2em] text-foreground mb-6">
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
        <p className="text-xs text-red-500 mt-4 font-light tracking-wide animate-pulse">{error}</p>
      ) : null}
    </div>
  );
}
