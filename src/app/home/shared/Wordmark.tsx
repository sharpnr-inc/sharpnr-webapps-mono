/*
 * The SHARPNR wordmark, set live in the Sharpnr typeface with the official
 * logo standing in for the "A" — matching the brand lockup.
 *
 * Live text rather than an image: it stays razor sharp at any size, needs no
 * extra download, and inherits the page's font. The logo itself is never
 * redrawn — it is the official /sharpnr-logo-white.svg export (Legal &
 * Copyright Guidelines).
 *
 * The mark is decorative wherever the brand name is already announced in a
 * heading, so the whole lockup carries a single aria-label instead of leaking
 * "SH RPNR" to screen readers.
 */
interface WordmarkProps {
  className?: string;
  /** Expose the name to assistive tech (off when it is purely decorative). */
  label?: string;
}

export function Wordmark({ className = "", label }: WordmarkProps) {
  return (
    <span
      className={`hp-wordmark inline-flex items-center font-extrabold leading-none tracking-[0.01em] text-white ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      SH
      <img
        src="/sharpnr-logo-white.svg"
        alt=""
        /* Sized to Inter's cap height so it reads as a capital letter. The
           official export is #ECECEC, so lift it to match the pure-white
           letterforms beside it. */
        className="mx-[0.03em] h-[0.72em] w-auto translate-y-[0.005em] brightness-110"
      />
      RPNR
    </span>
  );
}
