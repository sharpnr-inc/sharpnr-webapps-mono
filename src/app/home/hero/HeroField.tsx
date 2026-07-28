/*
 * Scene 01 — the field behind the hero.
 *
 * Business vocabulary scattered across the whole frame at 6–10% opacity.
 * Nothing moves, nothing scrolls, nothing is connected to anything else.
 * Every few seconds a handful of words lift to about 22% for a moment and
 * settle back — the only motion in the scene, and the reason it reads as
 * alive rather than as decoration.
 *
 * The stillness is the point: an earlier build ran the same vocabulary on
 * scrolling lanes, which turned it into a ticker and started answering
 * "how does it work?" — a question Scene 03 owns. This answers "what is
 * Sharpnr?" by implication, before the visitor has read anything.
 *
 * Base opacity varies slightly per word and is written to a data attribute
 * so the animation can return each one to its own resting value rather than
 * flattening the field to a single opacity the first time it fires.
 *
 * Decorative: every term here appears as real content further down the
 * page, so nothing in the field is the only route to the information.
 */

import { FIELD } from "./heroVocabulary";

/** Deterministic variance — no Math.random at render, so the server and
 *  client agree and the field never shifts on hydration. */
const baseOpacity = (i: number) => 0.06 + (((i * 37) % 5) / 4) * 0.04;

export function HeroField() {
  return (
    <div className="hero-field" aria-hidden="true">
      {FIELD.map((w, i) => (
        <span
          key={`${w.label}-${i}`}
          className="hero-field-word"
          data-kind={w.kind}
          data-base={baseOpacity(i).toFixed(3)}
          /* Outermost column — dropped on phones, where a word centred at
             x 6 or x 92 runs off the side. */
          data-edge={w.x < 10 || w.x > 88}
          /* The rows closest to the copy. On a short viewport the copy
             block takes a far larger share of the height and these are the
             ones it reaches — so they drop rather than crowd it. */
          data-band={
            (w.y >= 15 && w.y <= 22) || (w.y >= 70 && w.y <= 78)
              ? "inner"
              : "outer"
          }
          style={{
            left: `${w.x}%`,
            top: `${w.y}%`,
            opacity: baseOpacity(i),
          }}
        >
          {w.label}
        </span>
      ))}
    </div>
  );
}
