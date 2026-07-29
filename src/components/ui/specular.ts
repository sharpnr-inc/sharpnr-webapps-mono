import { useEffect } from "react";

/*
 * The specular rim, as it is done on this site.
 *
 * ── What this is a version of ─────────────────────────────────────────
 * React Bits' SpecularButton: a rounded rect whose border carries a bright
 * arc, angled toward the pointer and brightening as the pointer nears. The
 * effect is exactly right for this site's CTAs. Its implementation is not,
 * for three reasons that are specific to this codebase rather than matters
 * of taste:
 *
 *   1. It is one WebGL context, one `Renderer`, one `requestAnimationFrame`
 *      loop and one window `pointermove` listener PER BUTTON. There are 21
 *      CTA instances across 12 files here, which is four to eight on a
 *      typical page and ten on the Platform page once the header's two are
 *      counted. Browsers cap live WebGL contexts around sixteen and start
 *      discarding the oldest; well before that, eight RAF loops are
 *      competing with GSAP's ticker and Lenis for the same frame. This
 *      site's whole identity is that the scroll feels smooth.
 *
 *   2. It renders a `<button>`. Every CTA here is a navigation link — a
 *      router `Link` or an `<a>`. Swapping them for buttons would break
 *      middle-click, open-in-new-tab and the href crawlers read.
 *
 *   3. It needs `ogl`. claude.md records that this project runs GSAP only,
 *      and that anime.js and three.js were removed deliberately.
 *
 * So the effect is kept and the machinery is not. A conic gradient masked
 * to the border ring gives the same bright arc; the angle and brightness
 * come from CSS custom properties. Cost is one document listener and one
 * RAF for the whole page no matter how many CTAs are on it, and no new
 * dependency.
 *
 * ── Why a shared loop rather than a hook per button ───────────────────
 * Registering per element would put the per-button cost straight back. A
 * single module-level set is written by one listener, and the RAF only
 * runs while at least one element is near the pointer, so a page at rest
 * costs nothing at all.
 */

const els = new Set<HTMLElement>();

let raf = 0;
let px = -9999;
let py = -9999;
let listening = false;

/** `proximity={250}` — how far the pointer can be and still light a rim. */
const PROXIMITY = 250;

/** `intensity={1}` — the arc's opacity once the pointer is on the button. */
const INTENSITY = 1;

/*
 * Per element, held outside the DOM so a frame does not read back the style
 * it just wrote — reading a custom property forces the value to be parsed
 * again and undoes the point of batching.
 */
const state = new WeakMap<HTMLElement, { angle: number; bright: number }>();

function frame() {
  let anyLit = false;

  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;

    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    /* Distance to the element's box, not to its centre: a wide button
       should light when the pointer is beside its edge, not only when it
       is near the middle. */
    const dx = Math.max(r.left - px, 0, px - r.right);
    const dy = Math.max(r.top - py, 0, py - r.bottom);
    const dist = Math.hypot(dx, dy);

    const t = Math.max(0, 1 - dist / PROXIMITY);
    const target = t * t * (3 - 2 * t);

    const s = state.get(el) ?? { angle: -0.9, bright: 0 };

    /* The arc points at the pointer. `conic-gradient` measures clockwise
       from twelve o'clock while atan2 measures anticlockwise from three,
       hence the quarter turn and the negation. */
    const want = Math.atan2(py - cy, px - cx) + Math.PI / 2;

    /* Take the short way round, so crossing behind the button does not
       spin the highlight the long way. */
    const diff = ((want - s.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    s.angle += diff * 0.22;
    s.bright += (target - s.bright) * 0.16;

    state.set(el, s);

    if (s.bright > 0.002) {
      anyLit = true;
      el.style.setProperty("--sb-angle", `${s.angle}rad`);
      el.style.setProperty("--sb-bright", (s.bright * INTENSITY).toFixed(3));
    } else if (el.style.getPropertyValue("--sb-bright") !== "0") {
      el.style.setProperty("--sb-bright", "0");
    }
  }

  raf = anyLit ? requestAnimationFrame(frame) : 0;
}

function onMove(e: PointerEvent) {
  px = e.clientX;
  py = e.clientY;
  if (!raf) raf = requestAnimationFrame(frame);
}

/**
 * Register one CTA with the shared specular loop.
 *
 * Returns nothing and takes a ref object so a component can opt in with a
 * single line. Does nothing at all under reduced motion, and nothing on a
 * device with no fine pointer — the effect is a response to a cursor, and
 * on touch there is no cursor to respond to.
 */
export function useSpecular(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    els.add(el);
    if (!listening) {
      window.addEventListener("pointermove", onMove, { passive: true });
      listening = true;
    }

    return () => {
      els.delete(el);
      state.delete(el);
      if (els.size === 0 && listening) {
        window.removeEventListener("pointermove", onMove);
        listening = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      }
    };
  }, [ref]);
}
