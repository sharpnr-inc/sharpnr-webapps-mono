import { Button, Skeleton } from "@sharpnr/ui";
import {
  Plus,
  Tag,
  Percent,
  BookOpen,
  ArrowRight,
  Pencil,
  AlertCircle,
} from "lucide-react";
import type { LegalEntityTaxCategoryResponseDto } from "../../api/types";

interface LegalEntityTaxCategoriesTabProps {
  legalEntityID: string;
  tax_registration_length: number | undefined;
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
      </div>
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────
function EmptyTaxCategories({
  legalEntityID,
  tax_registration_length,
}: {
  legalEntityID: string;
  tax_registration_length: number | undefined;
}) {
  const hasRegistration = !!tax_registration_length;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-2">
        {hasRegistration ? (
          <Tag className="w-5 h-5 text-muted-foreground" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-500" />
        )}
      </div>

      {hasRegistration ? (
        <>
          <p className="text-sm font-medium">No tax categories added yet</p>
          <p className="text-xs text-muted-foreground max-w-xs leading-5">
            Tax categories like Room Rent, Food & Beverage, and Banquet define
            how tax rules and rates are applied to your products and services.
          </p>
          <Button
            size="sm"
            onClick={() => console.log("Add Tax Category", legalEntityID)}
          >
            <Plus />
            Add Tax Category
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm font-medium">No tax registrations found</p>
          <p className="text-xs text-muted-foreground max-w-xs leading-5">
            You have to add at least one{" "}
            <span className="font-medium text-foreground">
              Tax Registration
            </span>{" "}
            before adding Tax Categories.
          </p>
        </>
      )}
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
    <div className="group rounded-xl border bg-background p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      {/* Top row: icon + name/code + status badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 bg-muted/40">
            <Tag className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{category.name}</p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {category.code}
            </p>
          </div>
        </div>

        <span
          className={`text-xs px-2.5 py-0.5 rounded-full border shrink-0 font-medium ${
            category.is_active
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "border-border bg-muted/40 text-muted-foreground"
          }`}
        >
          {category.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Description */}
      {category.description && (
        <p className="text-xs text-muted-foreground leading-5 line-clamp-2">
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

      {/* Rules + account mappings summary */}
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

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-2 pt-1 border-t">
        <button
          onClick={() =>
            console.log("Edit Tax Category", category.id, legalEntityID)
          }
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted/60"
        >
          <Pencil className="w-3 h-3" />
          Edit
        </button>
        <div className="w-px h-3.5 bg-border" />
        <button
          onClick={() =>
            console.log("View Tax Category Details", category.id, legalEntityID)
          }
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted/60"
        >
          Details
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function LegalEntityTaxCategoriesSection({
  legalEntityID,
  tax_registration_length,
  data,
}: LegalEntityTaxCategoriesTabProps) {
  // Active first, then alphabetical
  const sorted = data
    ? [...data].sort((a, b) => {
        if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Page section heading */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            Tax Categories
          </h2>
          <p className="text-sm text-muted-foreground leading-5 max-w-xl">
            Tax categories classify your products and services for accurate tax
            calculation. Each category can have its own rules, rates, and
            account mappings applied at the time of billing.
          </p>
        </div>

        {/* Only show Add button when data is loaded */}
        {data && data.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log("Add Tax Category", legalEntityID)}
            className="shrink-0 gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Category</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}
      </div>

      {/* Loading */}
      {!data && (
        <div className="grid gap-3 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <TaxCategoryCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty */}
      {data && data.length === 0 && (
        <EmptyTaxCategories
          legalEntityID={legalEntityID}
          tax_registration_length={tax_registration_length}
        />
      )}

      {/* Grid */}
      {data && data.length > 0 && (
        <>
          <p className="text-xs text-muted-foreground -mt-2">
            {data.length} categor{data.length !== 1 ? "ies" : "y"}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {sorted.map((category) => (
              <TaxCategoryCard
                key={category.id}
                category={category}
                legalEntityID={legalEntityID}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
