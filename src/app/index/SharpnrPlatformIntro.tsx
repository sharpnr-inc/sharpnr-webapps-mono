import { useGSAP, gsap, SplitText } from "@/animations/gsap";
import { useRef } from "react";

const SharpnrPlatformIntro = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const split = SplitText.create(heading, { type: "lines" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          markers: true,
        },
      });

      // Phase 1: lines slide up from clip mask
      tl.from(split.lines, {
        yPercent: 110,
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Phase 2: scale down + pin to top-left
      tl.to(
        heading,
        {
          scale: 0.18,
          x: () =>
            -(heading.offsetWidth / 2) + (heading.offsetWidth * 0.18) / 2 + 24,
          y: () =>
            -(window.innerHeight / 2) + (heading.offsetHeight * 0.18) / 2 + 24,
          transformOrigin: "center center",
          ease: "power3.inOut",
          duration: 0.5,
        },
        0.5,
      );
    },
    { scope: mainContainerRef },
  );

  return (
    <section
      ref={mainContainerRef}
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <h1
        ref={headingRef}
        className="text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-tight tracking-tight will-change-transform"
        style={{ overflow: "hidden" }}
      >
        Sharpnr platform intro
      </h1>
    </section>
  );
};

export default SharpnrPlatformIntro;
