import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { useProductsIntroAnimation } from "./animations/useProductsIntroAnimation";

/*
 * The opening — the homepage hero's structure, on this page's subject.
 *
 * Centred, full width, and outside the left/right alternation: the hero is
 * the baseline every split below it swings against, not one of the swings.
 *
 * No background of its own. The canvas and the ink wash are one sheet held
 * at the root, wrapping every route and the footer.
 *
 * The headline is two lines that collapse to one from `lg` up, where there
 * is room for all 29 characters. Below that the halves become blocks so the
 * break lands on the comma — left to wrap naturally it would split mid-
 * phrase, which reads as a mistake.
 */
export function ProductsIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useProductsIntroAnimation({
    sectionRef,
    eyebrowRef,
    headingRef,
    copyRef,
    ctaRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh w-full overflow-hidden"
    >
      <div className="relative z-10 flex min-h-svh w-full items-center justify-center py-28">
        <div className="mx-auto w-full max-w-7xl px-6 text-center md:px-10">
          <p
            ref={eyebrowRef}
            className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-twilight sm:text-[0.6875rem] sm:tracking-[0.3em]"
          >
            Products
          </p>

          <h1
            ref={headingRef}
            className="hp-scene-title mt-5 font-extrabold text-white lg:whitespace-nowrap"
          >
            <span className="block lg:inline">
              <Words text="Complete alone," />
            </span>{" "}
            <span className="block text-twilight lg:inline">
              <Words text="Better as one." />
            </span>
          </h1>

          <p ref={copyRef} className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute">
            Every product works on its own. Add another and the work between
            them stops being yours to do.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button variant="primary" href={config.authAppUrl + "/signup"} arrow>
              Get Started
            </Button>
            <Button variant="secondary" to="/platform">
              Explore Platform
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
