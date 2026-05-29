import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HeroSection } from "./HeroSection";
import { SharpnrIntroductionSection } from "./whatIsSharpnr";
import { WhySharpnrSection } from "./WhyUsSection";

gsap.registerPlugin(ScrollTrigger);

export function Website() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── 1. Lenis smooth scroll ───────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out feel
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    // Bridge Lenis into GSAP's RAF loop — this is the critical step
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0); // prevents jumpy catch-up after tab switch

    // Keep ScrollTrigger positions in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // ── 2. Scroll animations ─────────────────────────────────────────
    const ctx = gsap.context(() => {
      // Every section tagged [data-animate="section"] fades + rises on enter
      gsap.utils
        .toArray<HTMLElement>("[data-animate='section']")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 70 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none reverse", // reverses on scroll back up
              },
            },
          );
        });

      // Section titles slide in from the left
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.fromTo(
          title,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Product/feature cards stagger in
      gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: i * 0.08, // manual stagger — more reliable with ScrollTrigger
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Hero slowly fades + drifts up as you scroll away — parallax exit
      gsap.to(".hero-content", {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "25% top",
          scrub: 1.5, // silky scrub tied to scroll speed
        },
      });
    }, wrapperRef);

    // ── Cleanup ──────────────────────────────────────────────────────
    return () => {
      ctx.revert();
      gsap.ticker.remove(raf); // must use same reference as add()
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <HeroSection />

      <div data-animate="section">
        <SharpnrIntroductionSection />
      </div>

      <div data-animate="section">
        <WhySharpnrSection />
      </div>
    </div>
  );
}
