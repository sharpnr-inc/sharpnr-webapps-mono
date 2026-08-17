import { Fragment } from "react";

interface WordsProps {
  /** The line of text; split into individually-animatable words. */
  text: string;
}

/**
 * Renders a line as React-owned `.hp-word` spans so anime.js can choreograph
 * each word (see reveal.ts) without splitText mutating React's DOM. Spaces are
 * real text nodes, so wrapping and copy/paste stay natural.
 */
export function Words({ text }: WordsProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="hp-word inline-block">{word}</span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}
