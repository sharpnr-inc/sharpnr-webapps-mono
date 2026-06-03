import { useEffect, useRef } from "react";

// Swap src to any video, image, or swap the whole thing for a canvas mograph
interface HeroSectionBackgroundProps {
  src?: string; // video src
  poster?: string; // video poster / fallback image
}

export function HeroSectionBackground({
  src = "/bg_video.mp4",
  poster = "/AppIcon.jpg",
}: HeroSectionBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* ── Video / image layer ── */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* ── Dark base tint so copy is always readable ── */}
      <div className="absolute inset-0 bg-[#02000d]/55" />

      {/* ── Left gradient — fades video behind the copy ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #02000d 0%, #02000d 18%, rgba(2,0,13,0.82) 36%, rgba(2,0,13,0.3) 58%, transparent 100%)",
        }}
      />

      {/* ── Bottom fade into page ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #02000d 100%)",
        }}
      />

      {/* ── Top edge fade ── */}
      <div
        className="absolute top-0 inset-x-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, #02000d 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
