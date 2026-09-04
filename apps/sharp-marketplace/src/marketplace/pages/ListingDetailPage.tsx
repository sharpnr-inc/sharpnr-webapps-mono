import { useState } from "react";
import { getRouteApi, Link } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@sharpnr/ui";
import { ArrowLeft, BadgeCheck, Bookmark, Clock, Star } from "lucide-react";

import {
  formatPrice,
  listingById,
  listings,
  supplierById,
} from "@/marketplace/data/listings";
import { RfqDialog } from "@/marketplace/components/RfqDialog";
import { ListingCard } from "@/marketplace/components/ListingCard";
import { useMarketplaceStore } from "@/store/MarketplaceStore";

const routeApi = getRouteApi("/_layout/listings/$listingId/");

export function ListingDetailPage() {
  const { listingId } = routeApi.useParams();
  const listing = listingById(listingId);

  const [quoteOpen, setQuoteOpen] = useState(false);
  const isSaved = useMarketplaceStore((s) => s.savedIds.includes(listingId));
  const toggleSaved = useMarketplaceStore((s) => s.toggleSaved);

  if (!listing) {
    return (
      <div className="rounded-lg border border-dashed py-16 text-center">
        <p className="text-sm font-medium">Listing not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          It may have been withdrawn by the supplier.
        </p>
        <Button variant="outline" size="sm" className="mt-4" asChild>
          <Link to="/browse">Back to browse</Link>
        </Button>
      </div>
    );
  }

  const supplier = supplierById(listing.supplierId);

  // Other listings from the same supplier: in B2B, consolidating spend with
  // one verified counterparty is usually the point.
  const alsoFromSupplier = listings.filter(
    (l) => l.supplierId === listing.supplierId && l.id !== listing.id,
  );

  return (
    <div className="space-y-6">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to browse
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {listing.kind}
              </Badge>
              <Badge variant="outline">{listing.category}</Badge>
            </div>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              {listing.title}
            </h1>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {listing.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-medium">Specifications</h2>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {listing.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-4 border-b pb-2 text-sm"
                  >
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="text-right font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {alsoFromSupplier.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-medium">
                Also from {supplier.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {alsoFromSupplier.map((other) => (
                  <ListingCard
                    key={other.id}
                    listing={other}
                    onRequestQuote={() => setQuoteOpen(true)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buy box. Sticky because the specs above it can run long, and the
            price and the RFQ button are what the page is for. */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Card>
            <CardContent className="space-y-4 pt-1">
              <div>
                <div className="text-2xl font-semibold">
                  {formatPrice(listing.price)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {listing.unit}
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Minimum order</span>
                  <span className="tabular-nums">
                    {listing.moq.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Lead time</span>
                  <span>{listing.leadTime}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setQuoteOpen(true)}>
                  Request quote
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleSaved(listing.id)}
                  aria-pressed={isSaved}
                  aria-label={isSaved ? "Remove from saved" : "Save listing"}
                >
                  <Bookmark
                    className={`size-4 ${isSaved ? "fill-current" : ""}`}
                  />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                No commission and no listing fees — you pay the supplier, not
                the marketplace.
              </p>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{supplier.name}</span>
                  {supplier.verified && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <BadgeCheck className="size-3.5" aria-hidden />
                      Verified
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="font-mono">{supplier.sharpId}</div>
                  <div>
                    {supplier.industry} · {supplier.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5" aria-hidden />
                    {supplier.rating} from {supplier.reviews} reviews
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden />
                    Responds {supplier.respondsIn}
                  </div>
                  <div>On Sharpnr since {supplier.onPlatformSince}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <RfqDialog
        listing={listing}
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
      />
    </div>
  );
}

export default ListingDetailPage;
