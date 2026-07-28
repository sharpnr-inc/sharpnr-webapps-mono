import { useRef } from "react";
import { Check } from "lucide-react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { useFutureAnimation } from "./animations/useFutureAnimation";

const comingNext = [
  "Healthcare (Lifco)",
  "Retail & commerce",
  "Corporate & professional services",
  "Education",
  "Manufacturing",
] as const;

/**
 * Section 09 — The future is connected. A calm, honest ending:
 * what's available now, what's coming, and an open invitation.
 *
 * Centred and full width. The alternation ended at Multi-industry; the
 * page settles here rather than swinging one more time. The deep-navy slab
 * it used to sit on is gone — the canvas and its ink wash run all the way
 * to the footer now, and a solid panel over the top of that reads as a
 * patch rather than as a finale.
 */
export function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useFutureAnimation({ sectionRef, contentRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={contentRef} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-twilight sm:text-[0.6875rem] sm:tracking-[0.3em]">
            The future is connected
          </p>
          <h2 className="mt-5 text-heading-lg font-bold text-white md:text-display-md">
            Built for today&rsquo;s industries.
            <br />
            <span className="text-twilight">
              Growing with tomorrow&rsquo;s businesses.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-mute">
            Join during Early Access and grow alongside a platform that&rsquo;s
            continuously expanding into new industries, new capabilities and
            new business connections.
          </p>

          {/* Honest availability */}
          <div className="mt-10 grid w-full gap-8 text-left sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
                Available now
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-white">
                <Check className="size-4 shrink-0 text-cyan" strokeWidth={2} />
                Sharp Operations · Hospitality
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
                Coming next
              </p>
              <ul className="mt-3 space-y-1.5">
                {comingNext.map((item) => (
                  <li key={item} className="text-sm text-mute">
                    {item}
                  </li>
                ))}
                <li className="text-sm italic text-mute/70">
                  …and more industry experiences over time
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              href={config.authAppUrl + "/signup"}
              arrow
            >
              Create Free Account
            </Button>
            <Button variant="secondary" to="/products">
              Explore Products
            </Button>
          </div>
          <p className="mt-6 text-sm text-mute/70">
            No subscription required during Early Access. Start with one
            experience — expand as your business grows.
          </p>
        </div>
      </div>
    </section>
  );
}
