interface CapabilityModuleProps {
  index: number;
  title: string;
  description: string;
  featured?: boolean;
}

/*
 * The card-free capability module — a hairline frame on the dark canvas.
 *
 * Only three things: an index mark, a name, one sentence. No icon chip, no
 * fill, no link — the border luminesces on hover and the index nudges
 * right, and that's the entire interaction.
 */
export function CapabilityModule({
  index,
  title,
  description,
  featured = false,
}: CapabilityModuleProps) {
  return (
    <div
      className={`hp-cap-module group mb-4 break-inside-avoid-column ${
        featured ? "p-7 md:p-8" : "p-6 md:p-7"
      }`}
    >
      <span className="hp-cap-index">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-mute">{description}</p>
    </div>
  );
}
