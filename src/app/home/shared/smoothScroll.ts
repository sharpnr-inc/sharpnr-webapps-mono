import type Lenis from "lenis";

/*
 * The page's one smooth-scroll instance, shared.
 *
 * Lenis intercepts wheel and touch, but a programmatic jump has to be handed
 * to it explicitly — calling `scrollIntoView` instead fights the running
 * animation and lands somewhere between the two. So the root registers its
 * instance here and anything that needs to scroll the page asks for it.
 *
 * A module-level reference rather than context: this is read from click
 * handlers, not during render, so context would add a provider and a
 * re-render for something no component needs to observe.
 */
let instance: Lenis | null = null;

export function registerSmoothScroll(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Scroll an element to just under the fixed header.
 *
 * Falls back to the native behaviour when Lenis is absent — which is the
 * case when the visitor has asked for reduced motion, since the root does
 * not create an instance at all then.
 */
export function scrollToElement(target: Element, offset = -88) {
  if (instance) {
    instance.scrollTo(target as HTMLElement, { offset });
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Scroll to an element by id, if it exists. */
export function scrollToId(id: string, offset = -88) {
  const target = document.getElementById(id);
  if (target) scrollToElement(target, offset);
}
