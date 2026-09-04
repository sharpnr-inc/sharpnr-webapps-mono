import { useMemo, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { Search, SlidersHorizontal } from "lucide-react";

import {
  categories,
  listings,
  supplierById,
  type Listing,
  type ListingKind,
} from "@/marketplace/data/listings";
import { ListingCard } from "@/marketplace/components/ListingCard";
import { RfqDialog } from "@/marketplace/components/RfqDialog";
import { useMarketplaceStore } from "@/store/MarketplaceStore";

const routeApi = getRouteApi("/_layout/browse/");

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Supplier rating" },
];

export function BrowsePage() {
  // The header's Saved link navigates here with ?saved=true rather than to a
  // separate page: it is the same grid with one filter already applied.
  const { saved: savedOnly } = routeApi.useSearch();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [kind, setKind] = useState<ListingKind | "all">("all");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [quoteFor, setQuoteFor] = useState<Listing | null>(null);

  const savedIds = useMarketplaceStore((s) => s.savedIds);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = listings.filter((listing) => {
      if (savedOnly && !savedIds.includes(listing.id)) return false;
      if (kind !== "all" && listing.kind !== kind) return false;
      if (category !== categories[0] && listing.category !== category)
        return false;

      if (!needle) return true;

      // Supplier name is searched too: in a B2B marketplace people often know
      // who they want to buy from before they know what it is called.
      const supplier = supplierById(listing.supplierId);
      return [
        listing.title,
        listing.summary,
        listing.category,
        supplier.name,
        ...listing.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating")
      sorted.sort(
        (a, b) =>
          supplierById(b.supplierId).rating - supplierById(a.supplierId).rating,
      );

    return sorted;
  }, [query, category, kind, sort, savedOnly, savedIds]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          {savedOnly ? "Saved listings" : "Browse the network"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {savedOnly
            ? "Listings you bookmarked while browsing."
            : "Products and services offered by verified organizations on Sharpnr. No commission, no listing fees."}
        </p>
      </div>

      {/* Filters in one row above the results, so the grid never jumps under
          a filter panel that opens and closes. */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, services or suppliers…"
            className="pl-8"
            aria-label="Search listings"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={kind}
          onValueChange={(v) => setKind(v as ListingKind | "all")}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Products & services</SelectItem>
            <SelectItem value="product">Products only</SelectItem>
            <SelectItem value="service">Services only</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-[180px]">
            <SlidersHorizontal className="size-4" />
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary">{results.length}</Badge>
        {results.length === 1 ? "listing" : "listings"}
        {category !== categories[0] && <span>· {category}</span>}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-sm font-medium">No listings match those filters</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a broader category, or clear the search.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setCategory(categories[0]);
              setKind("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onRequestQuote={setQuoteFor}
            />
          ))}
        </div>
      )}

      <RfqDialog
        listing={quoteFor}
        open={Boolean(quoteFor)}
        onOpenChange={(open) => !open && setQuoteFor(null)}
      />
    </div>
  );
}

export default BrowsePage;
