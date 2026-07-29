import { useRef } from "react";
import { IndustryPreview } from "./IndustryPreview";
import { PREVIEWS } from "./previews";
import { usePreviewSpineAnimation } from "./animations/usePreviewSpineAnimation";

/**
 * The seven previews, and the one line that runs the length of them.
 *
 * The spine is held here rather than in each section because that is the
 * whole point of it: it does not restart, it is not handed from one
 * section to the next, and it has no seam at a section boundary. It is one
 * element, as tall as the run, drawing as the visitor descends.
 *
 * It sits on the container's left content edge, which is why every preview
 * indents its own content past it — the run reads as a set of entries
 * hanging off a datum rather than as seven independent pages. Below lg it
 * is dropped: at phone width there is no margin to give it, and a rule
 * running through body copy is a defect, not a device.
 */
export function PreviewRun() {
  const runRef = useRef<HTMLDivElement>(null);

  usePreviewSpineAnimation(runRef);

  return (
    <div ref={runRef} className="relative">
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        <div className="mx-auto h-full max-w-7xl px-5 md:px-8">
          <div className="relative h-full w-px bg-sky/12">
            <div className="ind-spine-fill absolute inset-0 origin-top bg-cyan/40" />
          </div>
        </div>
      </div>

      {PREVIEWS.map((data, i) => (
        <IndustryPreview key={data.id} data={data} index={i} />
      ))}
    </div>
  );
}
