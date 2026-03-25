"use client";

import Image from "next/image";

export default function AnimatedLogo() {
  const text = "Pure wind kite";

  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/IMG-20260318-WA0001.jpg"
        alt="Kite School Logo"
        width={90}
        height={90}
        className="object-contain"
        priority
      />

      <span className="text-blue-700 font-bold flex text-lg md:text-xl lg:text-2xl tracking-wide">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-letter"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </span>
  );
}
