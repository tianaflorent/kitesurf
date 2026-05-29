"use client";

import Image from "next/image";

export default function AnimatedLogo() {
  const text = "Pure wind kite";

  return (
    <span className="flex items-center gap-3 group">
      <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="Kite School Logo"
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105"
          priority
        />
      </div>

      <span className="font-heading font-medium flex text-lg md:text-xl tracking-widest uppercase transition-colors duration-500">
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
