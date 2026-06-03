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
    <div
      className="absolute inset-0 w-full h-full overflow-hidden
     md:mask-l-from-23% md:mask-l-to-80.6%
    
    mask-b-from-48% 
     
    md:mask-b-from-0% md:mask-b-to-85%"
    >
      {/* ── Video / image layer ── */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover aspect-video"
      />

      {/* ── Dark base tint so copy is always readable ── */}
      <div className="absolute inset-0 bg-[#0d1b2a]/53" />
    </div>
  );
}
