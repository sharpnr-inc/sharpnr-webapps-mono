import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HeroSection } from "./HeroSection";
import { SharpnrIntroductionSection } from "./sharpnrIntro";
import WobbleCardDemo from "@/components/wobble-card-demo";

gsap.registerPlugin(ScrollTrigger);

export function Website() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── 1. Lenis Smooth Scroll ───────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // ── 2. Cinematic Animations ──────────────────────────────────────
    const ctx = gsap.context(() => {
      // Global Entrance Reveal
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.inOut" },
      );

      // Smooth Section Reveal Logic
      gsap.utils
        .toArray<HTMLElement>("[data-animate='section']")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 100, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.4,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      // Unified Title Animation
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.fromTo(
          title,
          { opacity: 0, x: -30, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Product Card Stagger
      gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotationX: -15 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Hero Cinematic Parallax Exit
      gsap.to(".hero-content", {
        y: -150,
        scale: 0.9,
        opacity: 0,
        filter: "blur(20px)",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });

      // Background Transition
      gsap.to(".bg-overlay", {
        backgroundColor: "#020617",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    }, wrapperRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Cinematic Gradient Overlay */}
      <div className="bg-overlay fixed inset-0 pointer-events-none z-[-1]" />

      <div className="hero-content">
        <HeroSection />
      </div>

      <div className="space-y-32 pb-32">
        <div data-animate="section">
          <SharpnrIntroductionSection />
        </div>

        <div data-animate="section">
          <WobbleCardDemo />
        </div>
      </div>
    </div>
  );
}
