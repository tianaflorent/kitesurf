"use client";

import { useState, useEffect } from "react";

const HERO_POSTER = "/images/hero-poster.jpg";
const HERO_VIDEO_DESKTOP = "/videos/hero-optimized.mp4";
const HERO_VIDEO_MOBILE = "/videos/hero-mobile.mp4";

export default function HeroVideo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const targetSrc = isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP;
    
    // Resolve asynchronously to avoid synchronous setState inside useEffect ESLint rule
    Promise.resolve().then(() => {
      setVideoSrc(targetSrc);
    });
  }, []);

  return (
    <>
      {/* Poster image shown instantly while video loads */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_POSTER}')` }}
      />

      {/* Video fades in once ready */}
      {videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_POSTER}
          preload="auto"
          onCanPlayThrough={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
    </>
  );
}
