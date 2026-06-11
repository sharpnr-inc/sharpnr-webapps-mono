import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useCallback } from "react";

const products = [
  {
    productname: "Silo",
    description:
      "Silo is a storage solution with fine-grain controls. Store data in Object, Relational, or Serverless databases — all in one place.",
    bg: "#E8530C",
  },
  {
    productname: "Cables",
    description:
      "Cables connects your services in real time. Event-driven pipelines that keep every system perfectly in sync.",
    bg: "#1A6BF0",
  },
  {
    productname: "Folio",
    description:
      "Folio is your composable content layer. Build structured documents, portfolios, and rich publishing workflows.",
    bg: "#0E9E6E",
  },
];

export function ProductsHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entry animation on mount
  useGSAP(
    () => {
      gsap.fromTo(
        [headingRef.current, descRef.current, btnRef.current],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.1 },
      );
    },
    { scope: containerRef },
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      if (isAnimating.current || nextIndex === activeIndex) return;
      isAnimating.current = true;

      const targets = [headingRef.current, descRef.current, btnRef.current];

      gsap.to(targets, {
        opacity: 0,
        y: -24,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          gsap.to(containerRef.current, {
            backgroundColor: products[nextIndex].bg,
            duration: 0.45,
            ease: "power2.inOut",
          });

          setActiveIndex(nextIndex);

          setTimeout(() => {
            gsap.fromTo(
              targets,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.08,
                onComplete: () => {
                  isAnimating.current = false;
                },
              },
            );
          }, 16);
        },
      });
    },
    [activeIndex],
  );

  // Auto-cycle every 3.5s
  useGSAP(() => {
    const cycle = () => {
      timerRef.current = setTimeout(() => {
        const next = (activeIndex + 1) % products.length;
        goTo(next);
      }, 3500);
    };
    cycle();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, goTo]);

  const { productname, description, bg } = products[activeIndex];

  return (
    <div
      ref={containerRef}
      className="relative mt-10 flex flex-col items-center place-self-center text-center rounded-2xl w-7xl px-8 pb-12 pt-16 shadow-2xs drop-shadow-amber-100 shadow-amber-100"
      style={{
        background: bg,
        minHeight: "calc(100dvh - 24rem)",
      }}
    >
      {/* Text content */}
      <div className="max-w-2xl">
        <h1
          ref={headingRef}
          className="text-white font-bold tracking-tight leading-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)" }}
        >
          Everything you need to build with {productname} — yours by default.
        </h1>

        <p
          ref={descRef}
          className="text-white/80 leading-relaxed mb-9 font-normal"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
        >
          {description}
        </p>

        <a
          ref={btnRef}
          href="#"
          className="inline-block bg-white text-gray-900 font-semibold rounded-full px-8 py-3 text-base hover:opacity-90 hover:-translate-y-px transition-all duration-200"
        >
          Get started for free
        </a>
      </div>

      {/* Dot nav */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((p, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${p.productname}`}
            className="w-2 h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 hover:scale-125"
            style={{
              background: i === activeIndex ? "#fff" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
