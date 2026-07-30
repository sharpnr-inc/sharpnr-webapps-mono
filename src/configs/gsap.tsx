import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * Every GSAP plugin this site actually uses, and nothing else.
 *
 * ── Why this file shrank ──────────────────────────────────────────────
 * It used to import and register twenty-six plugins. Four of them are
 * imported anywhere in `src`: gsap, useGSAP, ScrollTrigger and
 * DrawSVGPlugin. MotionPathPlugin is kept because claude.md names it as
 * part of the stack and it costs nothing to have registered. The other
 * twenty-one were dead weight, and two of them were actively wrong:
 *
 *   ScrollSmoother was still being registered here after claude.md
 *   recorded it as deliberately removed in favour of Lenis. A registered
 *   plugin nobody calls is harmless until someone reads this file and
 *   concludes it is available.
 *
 *   Draggable, Flip and Observer were breaking the build outright. GSAP's
 *   own `types/index.d.ts` references `draggable.d.ts`, `flip.d.ts` and
 *   `observer.d.ts` in lowercase, while the package ships `Draggable.d.ts`
 *   and friends capitalised. On a case-insensitive filesystem TypeScript
 *   sees the same file under two names and raises TS1149 — three errors
 *   that made `npm run build` fail, because that script is `tsc -b && vite
 *   build`. It failed on every machine; `tsc -p tsconfig.app.json` was
 *   simply not the script anyone ran.
 *
 * The obvious fixes were both wrong. Lowercasing our imports satisfies a
 * case-insensitive filesystem and then fails at runtime on Linux, where
 * `Draggable.js` really is capitalised. A `paths` mapping in tsconfig
 * papers over a `node_modules` quirk with project-wide configuration.
 * Neither is needed when the honest answer is that nothing imports them.
 *
 * ── Adding one back ───────────────────────────────────────────────────
 * Import it, register it, export it. If it is one of the three above,
 * expect TS1149 to return, and solve it then with knowledge of what the
 * plugin is for — do not pre-emptively re-add the whole set.
 */
gsap.registerPlugin(
  useGSAP,
  DrawSVGPlugin,
  MotionPathPlugin,
  ScrollTrigger,
);

export { gsap, useGSAP, DrawSVGPlugin, MotionPathPlugin, ScrollTrigger };
