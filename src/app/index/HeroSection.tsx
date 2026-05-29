"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { animate } from "animejs";
import BlurText from "@/components/ui/BlurTextCom";
import { AppBrickWall } from "./Appbrickwall";
import { HulyGridBackground } from "./HulyGridBackground";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!dotRef.current) return;
    const anim = animate(dotRef.current, {
      scale: [1, 1.5],
      opacity: [1, 0.4],
      duration: 900,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
    return () => {
      anim.pause();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const badge = badgeRef.current;
      const heading = headingRef.current;
      const para = paraRef.current;

      gsap.set([badge, heading, para], { opacity: 0 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(badge, { y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          heading,
          { y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(para, { y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
    }, heroRef);

    const heading = headingRef.current;
    const onHeadingMove = (e: MouseEvent) => {
      if (!heading) return;
      const r = heading.getBoundingClientRect();
      gsap.to(heading, {
        x: ((e.clientX - r.left) / r.width - 0.5) * 14,
        y: ((e.clientY - r.top) / r.height - 0.5) * 8,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onHeadingLeave = () =>
      gsap.to(heading, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: "elastic.out(1,.35)",
      });

    heading?.addEventListener("mousemove", onHeadingMove as any);
    heading?.addEventListener("mouseleave", onHeadingLeave);

    return () => {
      ctx.revert();
      heading?.removeEventListener("mousemove", onHeadingMove as any);
      heading?.removeEventListener("mouseleave", onHeadingLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-screen overflow-hidden"
    >
      <HulyGridBackground />

      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 xl:gap-20 items-center min-h-[80vh] pointer-events-auto">
          <div>
            <div
              ref={badgeRef}
              style={{ opacity: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-8 cursor-default transition-transform hover:scale-105 duration-200"
            >
              <span className="relative flex h-2 w-2">
                <span
                  ref={dotRef}
                  className="inline-flex rounded-full h-2 w-2 bg-slate-300"
                />
              </span>
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em]">
                sharpnr-engine V1.0 Live
              </span>
            </div>

            <div
              ref={headingRef}
              style={{ opacity: 0 }}
              className="cursor-default"
            >
              <BlurText
                text="One Platform. Every Business."
                className="text-5xl lg:text-6xl xl:text-7xl mb-8 leading-[1.1] text-slate-50"
                animateBy="words"
              />
            </div>

            <p
              ref={paraRef}
              style={{ opacity: 0 }}
              className="text-xl text-slate-400 font-sans leading-relaxed max-w-lg"
            >
              Deeply integrated operations for organizations that refuse to
              stitch together disconnected tools.
            </p>
          </div>

          <AppBrickWall />
        </div>
      </div>
    </section>
  );
}
