import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { useProductsCloseAnimation } from "./animations/useProductsCloseAnimation";

/*
 * The page's one primary and one secondary action, held back until the
 * catalogue has been read.
 *
 * Centred, on the same canvas — the page closes where it opened rather
 * than dropping into a differently-coloured panel, which would read as a
 * banner bolted on after the fact.
 */
export function ProductsCloseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);

  useProductsCloseAnimation({
    sectionRef,
    headingRef,
    copyRef,
    ctaRef,
    trustRef,
  });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2
          ref={headingRef}
          className="hp-scene-title font-extrabold text-white"
        >
          <span className="block">
            <Words text="Start with one," />
          </span>
          <span className="block text-twilight">
            <Words text="Grow into the rest." />
          </span>
        </h2>

        <p ref={copyRef} className="hp-hero-copy mt-6 max-w-md text-mute">
          Adopt at the pace your business sets. Nothing has to be replaced
          later.
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        >
          <Button
            variant="primary"
            href={config.authAppUrl + "/signup"}
            arrow
            className="w-full sm:w-auto"
          >
            Get Started
          </Button>
          {/* The hero already offers the platform tour. Someone who has
              read the whole catalogue is further along than that, so the
              second action here is the documentation instead. */}
          <Button
            variant="secondary"
            href="https://docs.sharpnr.com"
            className="w-full sm:w-auto"
          >
            Read Documentation
          </Button>
        </div>

        <p ref={trustRef} className="mt-8 text-xs text-twilight">
          Free during Early Access, while the platform is in alpha.
        </p>
      </div>
    </section>
  );
}
