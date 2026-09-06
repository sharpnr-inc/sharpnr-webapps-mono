import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@sharpnr/utils";

/**
 * Reveals its subject once it has been scrolled to.
 *
 * Deliberately built on IntersectionObserver and CSS transitions rather than an
 * animation library, for two reasons. The first is that this runs on public
 * marketing pages, so it must not be able to leave content invisible: there is
 * an unconditional timeout below that reveals everything regardless, which
 * means a browser without IntersectionObserver, a failed observer, or a
 * mis-measured viewport costs a little polish instead of the whole page. The
 * second is that the website kit then carries no animation dependency, so every
 * app can use it whether or not it ships one.
 */
function useRevealed<T extends Element>(enabled: boolean) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(!enabled);

  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;

    // No node, or no observer to watch it with: show the content immediately.
    if (!node || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);

    // The safety net. If the observer never fires -- which is what happens when
    // the page is rendered without a real viewport, as a preview, a thumbnail,
    // or a screenshot -- the content still appears.
    const failsafe = window.setTimeout(() => {
      setRevealed(true);
      observer.disconnect();
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [enabled]);

  return { ref, revealed };
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** True when the visitor has asked for less motion. */
function usePrefersReducedMotion() {
  const subscribe = useCallback((notify: () => void) => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return () => {};
    }
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    query.addEventListener("change", notify);
    return () => query.removeEventListener("change", notify);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () =>
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia(REDUCED_MOTION_QUERY).matches
        : false,
    // Server / prerender: assume motion is fine, then correct on hydration.
    () => false,
  );
}

/**
 * Fades its subject up as it is scrolled to.
 *
 * Only for content below the fold. A hero animates nothing: it is the first
 * paint, so a transition there costs time and risks showing nothing at all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** Distance travelled. 0 fades in place. */
  y?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, revealed: shown } = useRevealed<HTMLDivElement>(!reduced);

  if (reduced) return <div className={className}>{children}</div>;

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translateY(${y}px)`,
    transition: `opacity 520ms cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 520ms cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    willChange: shown ? undefined : "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/** Staggers its children, for lists that should arrive in sequence. */
export function RevealGroup({
  children,
  className,
  step = 0.06,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Draws an SVG path on when it scrolls into view.
 *
 * `pathLength="1"` normalises the geometry, so a dash of 1 is exactly the whole
 * path however long it actually is -- which is what lets one CSS transition
 * draw any of these connectors without measuring them.
 *
 * Every site's diagram uses this for its edges, so what the reader watches is
 * the thing the diagram is about: something moving from one app to another.
 */
export function DrawPath({
  d,
  delay = 0,
  duration = 0.9,
  className = "stroke-current",
  strokeWidth = 1.5,
  dashed = false,
  markerEnd,
}: {
  d: string;
  delay?: number;
  duration?: number;
  className?: string;
  strokeWidth?: number;
  dashed?: boolean;
  /** e.g. `url(#arw)`, from a `DArrowDefs` in the same svg. */
  markerEnd?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, revealed } = useRevealed<SVGPathElement>(!reduced);

  const base = {
    d,
    fill: "none",
    strokeWidth,
    strokeLinecap: "round" as const,
    className: cn(className),
    ...(markerEnd ? { markerEnd } : {}),
  };

  if (reduced) {
    return <path {...base} {...(dashed ? { strokeDasharray: "4 4" } : {})} />;
  }

  // A dashed path cannot also draw on -- the dash pattern is what would do the
  // drawing -- so it fades in instead.
  if (dashed) {
    return (
      <path
        ref={ref}
        {...base}
        strokeDasharray="4 4"
        style={{
          opacity: revealed ? 1 : 0,
          transition: `opacity 400ms ease ${delay}s`,
        }}
      />
    );
  }

  return (
    <path
      ref={ref}
      {...base}
      pathLength={1}
      strokeDasharray={1}
      style={{
        strokeDashoffset: revealed ? 0 : 1,
        opacity: revealed ? 1 : 0,
        transition: `stroke-dashoffset ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 200ms ease ${delay}s`,
      }}
    />
  );
}
