import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Switch,
  toast,
} from "@sharpnr/ui";
import { Eye, MessageSquare } from "lucide-react";

import { formatPrice } from "@/marketplace/data/listings";

/**
 * The sell side: what this organization publishes to the network.
 *
 * Dummy until the listings API exists. Publishing is a toggle rather than a
 * catalog workflow on purpose -- the product's pitch is that offering what you
 * sell takes no catalog management.
 */
const ownListings = [
  {
    id: "own_1",
    title: "Managed cloud kitchen fit-out — turnkey",
    kind: "service",
    price: 1850000,
    unit: "per site",
    views: 412,
    rfqs: 9,
    published: true,
  },
  {
    id: "own_2",
    title: "Commercial refrigeration units — 600 L upright",
    kind: "product",
    price: 78000,
    unit: "per unit",
    views: 268,
    rfqs: 5,
    published: true,
  },
  {
    id: "own_3",
    title: "Kitchen equipment AMC — quarterly servicing",
    kind: "service",
    price: 64000,
    unit: "per year, per site",
    views: 97,
    rfqs: 2,
    published: true,
  },
  {
    id: "own_4",
    title: "Stainless prep counters — 1800 mm",
    kind: "product",
    price: 42500,
    unit: "per unit",
    views: 34,
    rfqs: 0,
    published: false,
  },
];

export function SellingPage() {
  const [published, setPublished] = useState<Record<string, boolean>>(
    Object.fromEntries(ownListings.map((l) => [l.id, l.published])),
  );

  const liveCount = Object.values(published).filter(Boolean).length;
  const totalViews = ownListings.reduce((sum, l) => sum + l.views, 0);
  const totalRfqs = ownListings.reduce((sum, l) => sum + l.rfqs, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Your listings</h1>
        <p className="text-sm text-muted-foreground">
          {liveCount} live · {totalViews.toLocaleString("en-IN")} views ·{" "}
          {totalRfqs} RFQs received. No commission on anything you sell here.
        </p>
      </div>

      <div className="grid gap-4">
        {ownListings.map((listing) => {
          const isLive = published[listing.id];

          return (
            <Card key={listing.id}>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {listing.kind}
                      </Badge>
                      {isLive ? (
                        <Badge variant="outline">Live</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </div>
                    <h2 className="mt-2 font-medium">{listing.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatPrice(listing.price)} {listing.unit}
                    </p>
                  </div>

                  <label className="flex shrink-0 items-center gap-2 text-sm">
                    <Switch
                      checked={isLive}
                      onCheckedChange={(next) => {
                        setPublished((prev) => ({
                          ...prev,
                          [listing.id]: next,
                        }));
                        toast.success(
                          next
                            ? "Listing published to the network"
                            : "Listing unpublished",
                          { description: listing.title },
                        );
                      }}
                      aria-label={
                        isLive ? "Unpublish listing" : "Publish listing"
                      }
                    />
                    {isLive ? "Published" : "Unpublished"}
                  </label>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye className="size-4" aria-hidden />
                    {listing.views.toLocaleString("en-IN")} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="size-4" aria-hidden />
                    {listing.rfqs} RFQs received
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="text-sm font-medium">Publishing takes no catalog setup</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          Anything your organization already sells can be offered to the
          network. Listings inherit your verified identity automatically.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() =>
            toast.info("Creating listings arrives with the listings API.")
          }
        >
          New listing
        </Button>
      </div>
    </div>
  );
}

export default SellingPage;
