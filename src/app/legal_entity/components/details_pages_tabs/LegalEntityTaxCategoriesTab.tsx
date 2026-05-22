import { Button, Skeleton } from "@sharpnr/ui";
import { Plus, Tag, Percent, BookOpen } from "lucide-react";
import type { LegalEntityTaxCategoryResponseDto } from "../../api/types";

interface LegalEntityTaxCategoriesTabProps {
  legalEntityID: string;
  data: LegalEntityTaxCategoryResponseDto[] | undefined;
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function TaxCategoryCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-5 w-14 rounded-full shrink-0" />
      </div>
      <div className="border-t pt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
      </div>
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────
function EmptyTaxCategories({ legalEntityID }: { legalEntityID: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-2">
        <Tag className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No tax categories added yet</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        Tax categories like Room Rent, Food & Beverage, and Banquet define how
        tax rules and rates are applied to your products and services.
      </p>
      <Button
        size="sm"
        onClick={() => console.log("Add Tax Category", legalEntityID)}
      >
        <Plus />
        Add Tax Category
      </Button>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function TaxCategoryCard({
  category,
  legalEntityID,
}: {
  category: LegalEntityTaxCategoryResponseDto;
  legalEntityID: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">

      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0">
            <Tag className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{category.name}</p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {category.code}
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full border shrink-0 text-muted-foreground">
          {category.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Description */}
      {category.description && (
        <p className="text-xs text-muted-foreground leading-5">
          {category.description}
        </p>
      )}

      {/* SAC / HSN codes */}
      {(category.sac_code || category.hsn_code) && (
        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t pt-3">
          {category.sac_code && (
            <span>
              SAC{" "}
              <span className="font-mono text-foreground">
                {category.sac_code}
              </span>
            </span>
          )}
          {category.hsn_code && (
            <span>
              HSN{" "}
              <span className="font-mono text-foreground">
                {category.hsn_code}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Rules + mappings summary */}
      <div className="flex items-center gap-2 flex-wrap border-t pt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Percent className="w-3 h-3 shrink-0" />
          <span>
            {category.rules.length} rule{category.rules.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <BookOpen className="w-3 h-3 shrink-0" />
          <span>
            {category.account_mappings.length} account mapping
            {category.account_mappings.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-1">
        <button
          onClick={() => console.log("Edit Tax Category", category.id, legalEntityID)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Edit
        </button>
      </div>

    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
export function LegalEntityTaxCategoriesTab({
  legalEntityID,
  data,
}: LegalEntityTaxCategoriesTabProps) {

  // Loading
  if (!data) {
    return (
      <div className="grid gap-3 md:grid-cols-2 pt-4">
        {[...Array(4)].map((_, i) => (
          <TaxCategoryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty
  if (data.length === 0) {
    return <EmptyTaxCategories legalEntityID={legalEntityID} />;
  }

  // Active first, then alphabetical
  const sorted = [...data].sort((a, b) => {
    if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="pt-4 space-y-4">

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {data.length} categor{data.length !== 1 ? "ies" : "y"}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log("Add Tax Category", legalEntityID)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Category</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((category) => (
          <TaxCategoryCard
            key={category.id}
            category={category}
            legalEntityID={legalEntityID}
          />
        ))}
      </div>

    </div>
  );
}