import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import BlurText from "@/components/ui/BlurTextCom";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const badge = badgeRef.current;
    const heading = headingRef.current;

    const ctx = gsap.context(() => {
      // Set invisible before animating (prevents FOUC)
      gsap.set([badge, heading, paraRef.current], { opacity: 0 });

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badge,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          heading,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(
          paraRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        );

      // Dot pulse loop
      gsap.to(dotRef.current, {
        scale: 1.5,
        opacity: 0.4,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    // Badge hover — spring bounce
    const onBadgeEnter = () =>
      gsap.to(badge, { scale: 1.05, duration: 0.2, ease: "power2.out" });
    const onBadgeLeave = () =>
      gsap.to(badge, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });

    badge?.addEventListener("mouseenter", onBadgeEnter);
    badge?.addEventListener("mouseleave", onBadgeLeave);

    // Heading parallax on mouse move
    const onHeadingMove = (e: MouseEvent) => {
      if (!heading) return;
      const rect = heading.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      gsap.to(heading, { x, y, duration: 0.4, ease: "power2.out" });
    };
    const onHeadingLeave = () =>
      gsap.to(heading, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.35)",
      });

    heading?.addEventListener("mousemove", onHeadingMove);
    heading?.addEventListener("mouseleave", onHeadingLeave);

    return () => {
      ctx.revert(); // Kills all GSAP animations in context
      badge?.removeEventListener("mouseenter", onBadgeEnter);
      badge?.removeEventListener("mouseleave", onBadgeLeave);
      heading?.removeEventListener("mousemove", onHeadingMove);
      heading?.removeEventListener("mouseleave", onHeadingLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 ">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-8 cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span
                ref={dotRef}
                className="inline-flex rounded-full h-2 w-2 bg-teal-500"
              />
            </span>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em]">
              sharpnr-engine V1.0 Live
            </span>
          </div>

          <div ref={headingRef} className="cursor-default">
            <BlurText
              text="One Platform. Every Business."
              className="text-6xl lg:text-8xl mb-8 leading-[1.1]"
              animateBy="words"
            />
          </div>

          <p
            ref={paraRef}
            className="text-xl lg:text-2xl text-slate-400 font-sans leading-relaxed mb-12 max-w-2xl"
          >
            Deeply integrated operations for organizations that refuse to stitch
            together disconnected tools.
          </p>
        </div>
      </div>
    </section>
  );
}
