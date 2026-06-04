import { useRef } from "react";
import { useGSAP, gsap } from "@/animations/gsap";

export function SharpnrIntroCard() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 0.9, duration: 7 },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full flex flex-col justify-center items-center shadow-lg"
    >
      {/* ── Title ────────────────────────────────────────── */}
      <h1 className="text-4xl md:text-8xl font-bold tracking-lite ">Sharpnr</h1>

      {/* this is line for the and then we Can Staggered the Stuffs like "Designed for Connect other Business"
      "for Manageing Operations", "for Managing Busniess", "Managing Employess"

      */}
      <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed">
        A unified ecosystem of products designed
      </p>
    </section>
  );
}
