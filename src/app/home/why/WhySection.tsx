import { useRef } from "react";
import {
  IconLayoutGrid,
  IconStack2,
  IconPuzzle,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Words } from "@/app/home/shared/Words";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  SkeletonDesigned,
  SkeletonFoundation,
  SkeletonIndependent,
  SkeletonScale,
} from "./skeletons";
import { useWhyAnimation } from "./animations/useWhyAnimation";

/*
 * What we believe — as a bento grid.
 *
 * Four principles, every one visible at all times: no accordion, nothing
 * behind a click. The asymmetry is deliberate — two tiles run double width
 * on opposite corners, so the block reads as laid out rather than as a row
 * of equal boxes.
 *
 * Each tile's header animates on hover and says the principle rather than
 * decorating it: rows sliding into alignment, four systems settling onto one
 * line, modules that can be removed, a shape repeated further out.
 *
 * Full-width: the alternating left/right rhythm ended at Scene 05, and the
 * closing scenes stay centred so the page settles rather than continuing to
 * swing.
 */
const ICON = "h-4 w-4 text-cyan";

const PRINCIPLES = [
  {
    title: "Designed together",
    description: "Software should be built together, not connected afterwards.",
    header: <SkeletonDesigned />,
    icon: <IconLayoutGrid className={ICON} />,
    className: "md:col-span-2",
  },
  {
    title: "One foundation",
    description: "Who you are means the same thing everywhere.",
    header: <SkeletonFoundation />,
    icon: <IconStack2 className={ICON} />,
    className: "md:col-span-1",
  },
  {
    title: "Independent capabilities",
    description: "Take only what you need. Nothing needs rebuilding later.",
    header: <SkeletonIndependent />,
    icon: <IconPuzzle className={ICON} />,
    className: "md:col-span-1",
  },
  {
    title: "Built to scale",
    description: "Growing doesn't change how your people work.",
    header: <SkeletonScale />,
    icon: <IconTrendingUp className={ICON} />,
    className: "md:col-span-2",
  },
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useWhyAnimation({ sectionRef, headingRef, copyRef, listRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 ref={headingRef} className="hp-scene-title font-extrabold text-white">
          <span className="block">
            <Words text="Designed as one," />
          </span>
          <span className="block text-twilight">
            <Words text="Not stitched together." />
          </span>
        </h2>
        <p ref={copyRef} className="hp-hero-copy mx-auto mt-6 max-w-lg text-mute">
          Built as one platform from day one.
        </p>
      </div>

      <div ref={listRef} className="mt-14 md:mt-16">
        <BentoGrid className="max-w-5xl md:auto-rows-60">
          {PRINCIPLES.map((p) => (
            <BentoGridItem
              key={p.title}
              title={p.title}
              description={p.description}
              header={p.header}
              icon={p.icon}
              className={p.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
