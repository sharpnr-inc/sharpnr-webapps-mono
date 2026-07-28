import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { Words } from "@/app/home/shared/Words";
import { usePlatformHeroAnimation } from "./animations/usePlatformHeroAnimation";

/**
 * Platform hero — the homepage introduced Sharpnr; this page explains
 * how it works.
 *
 * Centred, like every hero on the site: eyebrow, headline, one sentence,
 * two buttons, and nothing else. The capability diagram that used to sit
 * beside the copy is gone — DifferentSection, immediately below, makes the
 * same "everything converges into one platform" argument at full size, and
 * a hero carrying a second diagram was answering "how does it work?" before
 * the page had asked it.
 *
 * No background: the dark canvas and its ink wash are held at the root.
 */
export function PlatformHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  usePlatformHeroAnimation({ sectionRef, eyebrowRef, copyRef, ctaRef });

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
            How Sharpnr Works
          </p>

          {/* Two lines, breaking on the comma. Deliberately not run onto one
              line at lg like the homepage headline: at 43 characters this
              would overflow max-w-7xl at the top of the type scale, and the
              page clips rather than scrolls, so the overflow would be
              silent. Each half is short enough to stay intact on its own. */}
          <h1 className="hp-scene-title mt-5 font-extrabold text-white">
            <span className="phero-line-1 block">
              <Words text="The Business Platform," />
            </span>{" "}
            <span className="phero-line-2 block text-twilight">
              <Words text="Built for Everything." />
            </span>
          </h1>

          <p ref={copyRef} className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute">
            Every capability your business needs, designed to work together
            from day one.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <CtaLink tone="navy" variant="primary" to="/products" arrow>
              Explore Products
            </CtaLink>
            <CtaLink
              tone="navy"
              variant="secondary"
              href={config.authAppUrl + "/signup"}
            >
              Create Free Account
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
