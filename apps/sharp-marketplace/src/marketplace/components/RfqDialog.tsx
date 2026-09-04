import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Textarea,
  toast,
} from "@sharpnr/ui";

import {
  formatPrice,
  supplierById,
  type Listing,
} from "@/marketplace/data/listings";
import { useMarketplaceStore } from "@/store/MarketplaceStore";

/**
 * Raise a request for quotation against one listing.
 *
 * Quantity defaults to the listing's minimum order, because a quantity below
 * MOQ is the most common reason a supplier bounces an RFQ straight back.
 */
export function RfqDialog({
  listing,
  open,
  onOpenChange,
}: {
  listing: Listing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addRfq = useMarketplaceStore((s) => s.addRfq);

  const [quantity, setQuantity] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [note, setNote] = useState("");

  if (!listing) return null;

  const supplier = supplierById(listing.supplierId);
  const parsedQuantity = Number(quantity) || listing.moq;
  const belowMoq = parsedQuantity < listing.moq;
  const indicativeTotal = parsedQuantity * listing.price;

  const submit = () => {
    addRfq({
      listingId: listing.id,
      listingTitle: listing.title,
      supplierName: supplier.name,
      quantity: parsedQuantity,
      neededBy: neededBy || "Not specified",
      note,
    });

    toast.success("RFQ sent", {
      description: `${supplier.name} typically responds ${supplier.respondsIn}.`,
    });

    setQuantity("");
    setNeededBy("");
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request a quotation</DialogTitle>
          <DialogDescription>
            Sent to {supplier.name} · {supplier.location}. They typically
            respond {supplier.respondsIn}.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="text-sm font-medium">{listing.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Listed at {formatPrice(listing.price)} {listing.unit} · MOQ{" "}
            {listing.moq.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="rfq-quantity">Quantity</Label>
            <Input
              id="rfq-quantity"
              inputMode="numeric"
              placeholder={String(listing.moq)}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {belowMoq ? (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Below this supplier's minimum of{" "}
                {listing.moq.toLocaleString("en-IN")} — they may decline or
                quote a higher unit price.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Indicative total {formatPrice(indicativeTotal)} before
                negotiation.
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="rfq-needed-by">Needed by</Label>
            <Input
              id="rfq-needed-by"
              type="date"
              value={neededBy}
              onChange={(e) => setNeededBy(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Quoted lead time is {listing.leadTime}.
            </p>
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="rfq-note">Requirements</Label>
          <Textarea
            id="rfq-note"
            rows={3}
            placeholder="Specifications, delivery location, packaging, payment terms…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Send RFQ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
