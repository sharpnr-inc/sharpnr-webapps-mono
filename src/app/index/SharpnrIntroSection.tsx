"use client";

import { gsap } from "@/animations/gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export function SharpnrIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    tl.fromTo(
      ".intro-title",
      {
        scale: 1,
        opacity: 1,
      },
      {
        scale: 1.5,
        opacity: 0,
        ease: "none",
      },
    )
      .fromTo(
        ".intro-content",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
        },
        "<",
      )
      .fromTo(
        ".intro-content",
        {
          scale: 0.9,
        },
        {
          scale: 1,
          ease: "none",
        },
        "<",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center h-[3000px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

      <h1 className="intro-title absolute text-7xl md:text-9xl font-bold tracking-tight">
        Sharpnr
      </h1>

      <div className="intro-content max-w-4xl px-6 text-center opacity-0">
        <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed">
          A unified ecosystem of products designed to power modern businesses.
        </p>

        <h2 className="mt-8 text-4xl md:text-6xl font-bold">
          Build. Manage. Scale.
        </h2>
      </div>
    </section>
  );
}
