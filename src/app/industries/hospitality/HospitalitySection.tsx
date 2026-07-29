import { useRef } from "react";
import {
  Building2,
  ChefHat,
  Coffee,
  Croissant,
  HandPlatter,
  Martini,
  Network,
  Sandwich,
  Store,
  Utensils,
} from "lucide-react";
import { DualHeading } from "@/app/industries/DualHeading";
import { IndustryGlyph } from "@/app/industries/glyphs";
import { StatusChip } from "@/app/industries/StatusChip";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CATALOGUE } from "./catalogue";
import { HospitalityChain } from "./HospitalityChain";
import { useHospitalityAnimation } from "./animations/useHospitalityAnimation";
import { useHospitalityChainAnimation } from "./animations/useHospitalityChainAnimation";

const guestJourney = [
  { stage: "Reservation", note: "Availability stays accurate across every location." },
  { stage: "Arrival & check-in", note: "Guest history and requests reach every department." },
  { stage: "Dining", note: "Orders move by POS or QR, straight to the kitchen." },
  { stage: "Kitchen", note: "Every order routed to the right preparation station." },
  { stage: "Room & housekeeping", note: "Rooms, cleaning and maintenance stay coordinated." },
  { stage: "Billing & payment", note: "Split bills, room charges and payments in one flow." },
  { stage: "Accounting", note: "Every event posts to your books automatically." },
  { stage: "Feedback & loyalty", note: "The stay becomes a lasting guest relationship." },
] as const;

/*
 * Who it is for.
 *
 * Eighteen sub-types read as a keyword dump and made the same claim ten
 * times over; these are the ten categories they collapse into, each still
 * a venue type from website_instruction/07_Industries.md — nothing new is
 * invented here.
 *
 * They are search surfaces, so every name is real text in a real list.
 * The icon is decorative and hidden from assistive technology; the label
 * carries the meaning on its own. No category links anywhere yet, because
 * no per-venue route exists — inventing one would be a broken promise.
 */
const builtFor = [
  { name: "Hotels & Resorts", icon: Building2 },
  { name: "Restaurants", icon: Utensils },
  { name: "Cafés & Coffee Chains", icon: Coffee },
  { name: "Bars & Nightlife", icon: Martini },
  { name: "Cloud Kitchens", icon: ChefHat },
  { name: "QSR & Food Courts", icon: Sandwich },
  { name: "Bakeries & Desserts", icon: Croissant },
  { name: "Catering", icon: HandPlatter },
  { name: "Hospitality Groups", icon: Network },
  { name: "Franchises", icon: Store },
] as const;

/**
 * Section 02 — Hospitality, available today. Visitors follow one
 * guest through the business; the platform stays almost invisible.
 *
 * Full width: the rail is the section, so there is no second column to
 * put anything opposite. Alternation starts at Healthcare below.
 *
 * Three things here replaced flat lists, in the order the section reads:
 *
 *   the chain      a row of product chips became a figure that shows one
 *                  guest order reaching seven systems in causal order.
 *   the bento      the same chips, given unequal emphasis, in the site's
 *                  existing card language rather than a second one.
 *   the categories eighteen sub-types collapsed into ten, as indexable
 *                  text with a Lucide glyph each.
 */
export function HospitalitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);

  useHospitalityAnimation({ sectionRef, introRef });
  useHospitalityChainAnimation({ sectionRef, chainRef });

  return (
    <section
      ref={sectionRef}
      id="hospitality"
      className="relative scroll-mt-24 border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        {/* Name left, status hard right, rule under — the same header the
            seven previews carry, so the one industry that exists is read
            in the same glance as the ones that do not. Its chip is the
            only cyan one on the page. */}
        <div ref={introRef}>
          <div className="flex items-center justify-between gap-4 border-b border-sky/12 pb-4">
            <div className="flex items-center gap-4">
              <IndustryGlyph
                id="hospitality"
                className="h-11 w-16 shrink-0"
              />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mute">
                Sharp Operations · Hospitality
              </span>
            </div>
            <StatusChip status="available" />
          </div>

          <DualHeading
            lead="Built for hospitality,"
            tail="not adapted to it."
            className="mt-8 text-heading-lg md:text-heading-xl"
          />
          <p className="prose-width mt-5 text-body-lg text-mute">
            Hospitality is fast-paced — every minute matters, and staff
            coordinate across kitchens, rooms, inventory and suppliers. Your
            team focuses on guests. Sharpnr keeps the business connected.
          </p>
        </div>

        {/* One guest, one connected day — alternating rail */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute bottom-6 left-[9px] top-6 w-px bg-sky/15 md:left-1/2">
            <div className="hosp-fill h-full w-full origin-top scale-y-0 bg-cyan/70" />
          </div>
          <ol className="relative space-y-10">
            {guestJourney.map((step, i) => (
              <li
                key={step.stage}
                className={`hosp-step relative flex gap-5 md:w-1/2 md:gap-6 ${
                  i % 2 === 0
                    ? "md:pr-10 md:text-right"
                    : "md:ml-auto md:pl-10"
                }`}
              >
                <span
                  className={`absolute left-0 top-1 z-10 block size-[19px] rounded-full border-2 border-cyan/60 bg-canvas ${
                    i % 2 === 0
                      ? "md:left-auto md:-right-[9.5px]"
                      : "md:-left-[9.5px]"
                  }`}
                />
                <div className="pl-9 md:pl-0">
                  <h3 className="text-title-md font-semibold text-white">
                    {step.stage}
                  </h3>
                  <p className="mt-1 text-sm text-mute">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* One guest action, seven systems responding.

            The paragraph that used to sit here listed the kitchen, the
            stock count, the books, the guest's history and the manager's
            figures — which is exactly the sequence lighting up in the
            figure directly below it. The reader was told the thing and
            then shown the thing. One lead-in line survives; every node in
            the drawing already carries its own two-word label, which is
            where an explanation belongs because it is where the eye
            already is. "Nothing operates in isolation" is gone too: the
            unbroken line under the ecosystem band is that sentence. */}
        <div className="mt-24">
          {/* Every word of the original headline survives; it is only
              broken at the comma so it can take the site's two-colour
              form. "Nothing re-entered" is the half that belongs in
              twilight — it is the consequence, not the claim. */}
          <DualHeading
            as="h3"
            lead="One order,"
            tail="nothing re-entered."
          />
          <p className="prose-width mt-3 text-base text-mute">
            A guest orders once. Everything behind that moment responds on
            its own.
          </p>
          <div ref={chainRef} className="mx-auto mt-12 max-w-5xl">
            <HospitalityChain />
          </div>
        </div>

        {/* What powers the day */}
        <div className="mt-24">
          <DualHeading
            as="h3"
            lead="Powering every moment,"
            tail="on one platform."
          />
          <p className="prose-width mt-3 text-base text-mute">
            Operations, business, customer and intelligence — every one of
            them part of the same platform, not a bundle of applications sold
            together.
          </p>
          {/* Shorter rows than Scene 06's. Those tiles carry a full
              illustration; these carry a kicker and three lines, and at the
              homepage's 18rem row height every one of them floated its text
              at the bottom of an empty box. An arbitrary value rather than
              `auto-rows-44`: Tailwind v4 has no spacing-scale step for this
              utility, so the bare number silently generates nothing. */}
          <BentoGrid className="mt-10 max-w-6xl md:auto-rows-[11rem]">
            {CATALOGUE.map((tile) => (
              <BentoGridItem
                key={tile.title}
                title={tile.title}
                description={tile.description}
                header={tile.header}
                icon={tile.icon}
                className={tile.className}
              />
            ))}
          </BentoGrid>
        </div>

        {/* Who it's for */}
        {/* Who it's for — cards, not a list.

            Ten names on ten hairlines read as a footnote. As cards they
            read as a range, which is the claim: this one experience covers
            a hotel, a cloud kitchen and a franchise group. The hover is
            `transition-colors` only — a bare `transition` would cover
            transform and opacity and fight every GSAP tween in the
            section. Glyphs stay hidden; the name is the search surface and
            carries the meaning on its own. */}
        <div className="mt-24">
          <DualHeading
            as="h3"
            lead="Every hospitality business,"
            tail="whatever its shape."
          />
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {builtFor.map(({ name, icon: Icon }) => (
              <li key={name}>
                <div className="group flex h-full flex-col justify-between gap-6 border border-sky/12 p-4 transition-colors duration-200 hover:border-cyan/45">
                  <Icon
                    className="size-5 shrink-0 text-cyan/70 transition-colors duration-200 group-hover:text-cyan"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium leading-snug text-white/85">
                    {name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* The ecosystem paragraph that used to close the section is gone.
            Eight product names run together as prose is a list pretending
            to be a sentence, and nobody reads any of them; the same eight
            are now the band under the chain figure above, where the claim
            "nothing operates in isolation" is drawn rather than asserted. */}
      </div>
    </section>
  );
}
