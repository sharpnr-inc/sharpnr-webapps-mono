import { useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@sharpnr/ui";
import { Scale, X } from "lucide-react";

import {
  formatPrice,
  listingById,
  supplierById,
} from "@/marketplace/data/listings";
import { useMarketplaceStore } from "@/store/MarketplaceStore";

/**
 * Sticky tray for side-by-side vendor comparison.
 *
 * It lives in the layout rather than on the browse page so a comparison
 * survives navigating into a listing and back out again -- which is exactly
 * when people add the second and third vendor.
 */
export function CompareTray() {
  const compareIds = useMarketplaceStore((s) => s.compareIds);
  const clearCompare = useMarketplaceStore((s) => s.clearCompare);
  const toggleCompare = useMarketplaceStore((s) => s.toggleCompare);
  const [open, setOpen] = useState(false);

  if (compareIds.length === 0) return null;

  const selected = compareIds
    .map((id) => listingById(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const rows: { label: string; value: (l: (typeof selected)[number]) => string }[] =
    [
      { label: "Supplier", value: (l) => supplierById(l.supplierId).name },
      { label: "Location", value: (l) => supplierById(l.supplierId).location },
      {
        label: "Rating",
        value: (l) => {
          const s = supplierById(l.supplierId);
          return `${s.rating} (${s.reviews} reviews)`;
        },
      },
      { label: "Price", value: (l) => `${formatPrice(l.price)} ${l.unit}` },
      { label: "MOQ", value: (l) => l.moq.toLocaleString("en-IN") },
      { label: "Lead time", value: (l) => l.leadTime },
      {
        label: "Responds in",
        value: (l) => supplierById(l.supplierId).respondsIn,
      },
    ];

  return (
    <>
      <div className="sticky bottom-0 z-40 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <Scale className="size-4" aria-hidden />
            Comparing
            <Badge variant="secondary">{selected.length}</Badge>
          </span>

          <div className="flex flex-1 flex-wrap gap-2">
            {selected.map((listing) => (
              <span
                key={listing.id}
                className="flex max-w-[220px] items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1 text-xs"
              >
                <span className="truncate">{listing.title}</span>
                <button
                  onClick={() => toggleCompare(listing.id)}
                  aria-label={`Remove ${listing.title} from comparison`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(true)}
              disabled={selected.length < 2}
            >
              Compare {selected.length < 2 ? "(pick 2+)" : ""}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Vendor comparison</DialogTitle>
            <DialogDescription>
              Side by side, before you commit to one.
            </DialogDescription>
          </DialogHeader>

          {/* Wide content scrolls inside its own container so the dialog body
              never forces the page sideways. */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-32 border-b p-2 text-left font-medium text-muted-foreground">
                    &nbsp;
                  </th>
                  {selected.map((listing) => (
                    <th
                      key={listing.id}
                      className="border-b p-2 text-left align-bottom font-medium"
                    >
                      {listing.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td className="border-b p-2 text-muted-foreground">
                      {row.label}
                    </td>
                    {selected.map((listing) => (
                      <td key={listing.id} className="border-b p-2">
                        {row.value(listing)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
