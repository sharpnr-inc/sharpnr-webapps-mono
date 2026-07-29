import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { ProductsAssembly } from "./ProductsAssembly";
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
 * ── The headline ────────────────────────────────────────────────────
 * "Take one, the rest already fit." It replaced "Complete alone, better as
 * one", which had three problems: "complete alone" reads closer to lonely
 * than to self-sufficient; "better as one" is the shape of a benefit with
 * no content in it; and between them they were the page's own message line
 * — independent when needed, connected by design — restated in the largest
 * type on the page. It was also vaguer than the sentence underneath it,
 * which is backwards. The new one names the decision a visitor is actually
 * making (start with a single product) and answers the objection that
 * follows it, and the lede then extends it rather than repeating it.
 *
 * Two lines that collapse to one from `lg` up, where there is room for all
 * 30 characters. Below that the halves become blocks so the break lands on
 * the comma — left to wrap naturally it would split mid-phrase, which
 * reads as a mistake.
 *
 * ── The two buttons are gone ────────────────────────────────────────
 * The reasoning the Industries hero already records applies here without
 * modification. This is a navigational page: somebody opening /products is
 * finding out what exists, and the answer runs to nine capability groups
 * below this screen. A signup asked before any of it has been shown is
 * asked at the worst possible moment, and ProductsCloseSection carries the
 * page's invitation at the end, where it has been earned.
 *
 * What replaced them is the argument itself — see ProductsAssembly.
 */
export function ProductsIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useProductsIntroAnimation({
    sectionRef,
    eyebrowRef,
    headingRef,
    copyRef,
    figureRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
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
            <Words text="Take one," />
          </span>{" "}
          <span className="block text-twilight lg:inline">
            <Words text="the rest already fit." />
          </span>
        </h1>

        <p ref={copyRef} className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute">
          Every product works on its own. Add another and the work between
          them stops being yours to do.
        </p>
      </div>

      {/* Five units, each whole, cut to fill one outline. */}
      <div
        ref={figureRef}
        className="relative z-10 mx-auto mt-12 w-full max-w-2xl md:mt-16"
      >
        <ProductsAssembly />
      </div>
    </section>
  );
}
