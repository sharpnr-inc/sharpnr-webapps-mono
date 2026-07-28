import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { HeroField } from "./HeroField";
import { useHeroAnimation } from "./animations/useHeroAnimation";

/*
 * Scene 01 — Hero.
 *
 * The hero answers "what is Sharpnr?" — nothing more. "How does it work?"
 * is Scene 03's job, and every earlier build here drifted into answering it
 * instead. So the foreground carries only the eyebrow, the headline, one
 * sentence and two buttons; the scope of the product is made by the field
 * of business vocabulary behind them, which the visitor absorbs without
 * reading it.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({ sectionRef, copyRef, ctaRef, eyebrowRef });

  return (
    <section
      ref={sectionRef}
      className="hero-stage relative min-h-svh w-full overflow-hidden"
    >
      <HeroField />

      {/* px-6 / md:px-10 on max-w-7xl is the shared homepage indent — every
          scene below starts on this line, so the hero has to as well. */}
      <div className="relative z-10 flex min-h-svh w-full items-center justify-center py-28">
        <div className="relative mx-auto w-full max-w-7xl px-6 text-center md:px-10">
          <p
            ref={eyebrowRef}
            /* Tighter tracking on small screens — at 0.3em the line wraps
               onto two, and a wrapped eyebrow reads as a sentence. */
            className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-twilight sm:text-[0.6875rem] sm:tracking-[0.3em]"
          >
            Connected Business Infrastructure
          </p>

          {/* One line from lg up, where there is room for all 28 characters.
              Below that the halves become blocks so the break lands on the
              comma — left to wrap naturally it split "Every / Business.",
              which reads as a mistake. Forcing nowrap on a phone would just
              overflow the viewport. */}
          <h1 className="hp-scene-title mt-5 font-extrabold text-white lg:whitespace-nowrap">
            <span className="hero-line-1 block lg:inline">
              <Words text="One Platform," />
            </span>{" "}
            <span className="hero-line-2 block text-twilight lg:inline">
              <Words text="Every Business." />
            </span>
          </h1>

          <p
            ref={copyRef}
            className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute"
          >
            Run your whole business on software that was built together.
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
