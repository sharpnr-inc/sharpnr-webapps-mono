import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { DualHeading } from "../DualHeading";
import { useFutureAnimation } from "./animations/useFutureAnimation";

/**
 * Section 09 — the close. Centred and full width; the page turned centred
 * at Multi-industry and stays that way to the footer.
 *
 * This is the page's one invitation, and it is the only one. The hero used
 * to carry two buttons, which asked a visitor to sign up before the page
 * had answered the question they arrived with — and for seven of eight
 * industries the honest answer is "not yet". By here it has been answered
 * eight times over, so the ask has been earned.
 *
 * The two-column "available now / coming next" block that used to sit here
 * is gone. It restated the hero rail and eight status chips for a third
 * time, and a page that has to say which things exist three times has not
 * managed to show it once.
 */
export function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useFutureAnimation({ sectionRef, contentRef });

  return (
    <section ref={sectionRef} className="relative border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div
          ref={contentRef}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-twilight sm:text-[0.6875rem] sm:tracking-[0.3em]">
            The future is connected
          </p>

          <DualHeading
            lead="Built for today,"
            tail="growing into tomorrow."
            className="mt-5 text-heading-lg md:text-display-md"
          />

          <p className="mt-5 max-w-xl text-body-lg text-mute">
            Hospitality is available today. Healthcare, retail, education and
            manufacturing are being designed on the same foundation, so the
            platform you start on is the one you grow into.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" href={config.authAppUrl + "/signup"} arrow>
              Create Free Account
            </Button>
            <Button variant="secondary" to="/products">
              Explore Products
            </Button>
          </div>
          <p className="mt-6 text-sm text-mute/70">
            No subscription required during Early Access. Start with what is
            here; add the rest as they arrive.
          </p>
        </div>
      </div>
    </section>
  );
}
