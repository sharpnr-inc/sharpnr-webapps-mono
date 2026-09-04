import { Link } from "@tanstack/react-router";
import { Badge, Button, Card, CardContent, toast } from "@sharpnr/ui";
import { Bookmark, BadgeCheck, Scale, Star } from "lucide-react";

import {
  formatPrice,
  supplierById,
  type Listing,
} from "@/marketplace/data/listings";
import { MAX_COMPARE, useMarketplaceStore } from "@/store/MarketplaceStore";

export function ListingCard({
  listing,
  onRequestQuote,
}: {
  listing: Listing;
  onRequestQuote: (listing: Listing) => void;
}) {
  const supplier = supplierById(listing.supplierId);
  const isSaved = useMarketplaceStore((s) => s.savedIds.includes(listing.id));
  const isComparing = useMarketplaceStore((s) =>
    s.compareIds.includes(listing.id),
  );
  const toggleSaved = useMarketplaceStore((s) => s.toggleSaved);
  const toggleCompare = useMarketplaceStore((s) => s.toggleCompare);

  const onCompare = () => {
    const accepted = toggleCompare(listing.id);
    if (!accepted) {
      toast.error(`You can compare up to ${MAX_COMPARE} listings at once.`);
    }
  };

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardContent className="flex flex-1 flex-col gap-3 pt-1">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="capitalize">
            {listing.kind}
          </Badge>

          <button
            onClick={() => toggleSaved(listing.id)}
            aria-label={isSaved ? "Remove from saved" : "Save listing"}
            aria-pressed={isSaved}
            className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bookmark
              className={`size-4 ${isSaved ? "fill-current text-foreground" : ""}`}
            />
          </button>
        </div>

        <div>
          <Link
            to="/listings/$listingId"
            params={{ listingId: listing.id }}
            className="text-sm font-medium leading-snug hover:underline"
          >
            {listing.title}
          </Link>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {listing.summary}
          </p>
        </div>

        {/* Supplier identity is the point of an O2O marketplace, so it sits on
            the card rather than only on the detail page. */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{supplier.name}</span>
          {supplier.verified && (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <BadgeCheck className="size-3.5" aria-hidden />
              Verified
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="size-3.5" aria-hidden />
            {supplier.rating}
          </span>
          <span>{supplier.location}</span>
        </div>

        <div className="mt-auto space-y-3 pt-1">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-base font-semibold">
                {formatPrice(listing.price)}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                {listing.unit}
              </span>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              MOQ {listing.moq.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onRequestQuote(listing)}
            >
              Request quote
            </Button>
            <Button
              size="sm"
              variant={isComparing ? "secondary" : "outline"}
              onClick={onCompare}
              aria-pressed={isComparing}
            >
              <Scale className="size-4" />
              <span className="sr-only">
                {isComparing ? "Remove from comparison" : "Add to comparison"}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
