/**
 * The living business ecosystem — the signature Sharpnr visual.
 *
 * An abstract constellation: independent points of a business held
 * together by one platform at the center. Connections draw in on
 * load; small events travel across them. No labels — the picture
 * should communicate "everything works together" on its own.
 *
 * Animated by useHeroAnimation via the .hero-line / .hero-node /
 * .hero-pulse hooks. Pure SVG, palette-locked, no raster assets.
 */
export function HeroEcosystem() {
  return (
    <svg
      viewBox="0 0 560 560"
      role="img"
      aria-label="A network of business activities connected through one central platform"
      className="h-auto w-full max-w-lg"
    >
      {/* Connections — platform to every part of the business */}
      <g
        className="hero-lines"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.2"
      >
        <path id="hp-1" className="hero-line" d="M280 234 Q262 160 280 104" />
        <path id="hp-2" className="hero-line" d="M316 252 Q392 178 438 148" />
        <path id="hp-3" className="hero-line" d="M326 280 Q420 262 482 296" />
        <path id="hp-4" className="hero-line" d="M314 312 Q380 396 416 434" />
        <path id="hp-5" className="hero-line" d="M280 326 Q296 420 280 472" />
        <path id="hp-6" className="hero-line" d="M248 314 Q178 392 138 426" />
        <path id="hp-7" className="hero-line" d="M234 280 Q150 296 82 288" />
        <path id="hp-8" className="hero-line" d="M246 250 Q176 186 140 142" />
        {/* Business relationships between activities themselves */}
        <path id="hp-9" className="hero-line" d="M296 100 Q372 96 428 136" />
        <path id="hp-10" className="hero-line" d="M492 310 Q476 386 430 428" />
        <path id="hp-11" className="hero-line" d="M266 476 Q204 470 150 438" />
        <path id="hp-12" className="hero-line" d="M78 274 Q92 198 130 152" />
      </g>

      {/* The platform */}
      <g className="hero-core">
        <circle
          cx="280"
          cy="280"
          r="72"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
        />
        <circle
          cx="280"
          cy="280"
          r="46"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.4"
        />
        <circle cx="280" cy="280" r="9" fill="#00b4d8" />
      </g>

      {/* Parts of the business — different sizes, one system */}
      <g className="hero-nodes">
        <circle className="hero-node" cx="280" cy="92" r="12" fill="#03045e" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
        <circle className="hero-node" cx="444" cy="140" r="8" fill="#90e0ef" fillOpacity="0.25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <circle className="hero-node" cx="494" cy="300" r="12" fill="#03045e" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
        <circle className="hero-node" cx="422" cy="440" r="8" fill="#90e0ef" fillOpacity="0.25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <circle className="hero-node" cx="280" cy="484" r="11" fill="#03045e" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
        <circle className="hero-node" cx="132" cy="432" r="8" fill="#90e0ef" fillOpacity="0.25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <circle className="hero-node" cx="70" cy="288" r="12" fill="#03045e" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
        <circle className="hero-node" cx="134" cy="146" r="8" fill="#90e0ef" fillOpacity="0.25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
      </g>

      {/* Business events travelling across the platform */}
      <g className="hero-pulses">
        <circle className="hero-pulse" data-path="#hp-1" r="3" fill="#00b4d8" opacity="0" />
        <circle className="hero-pulse" data-path="#hp-3" r="3" fill="#00b4d8" opacity="0" />
        <circle className="hero-pulse" data-path="#hp-5" r="3" fill="#00b4d8" opacity="0" />
        <circle className="hero-pulse" data-path="#hp-7" r="3" fill="#00b4d8" opacity="0" />
        <circle className="hero-pulse" data-path="#hp-9" r="2.5" fill="#90e0ef" opacity="0" />
        <circle className="hero-pulse" data-path="#hp-11" r="2.5" fill="#90e0ef" opacity="0" />
      </g>
    </svg>
  );
}
