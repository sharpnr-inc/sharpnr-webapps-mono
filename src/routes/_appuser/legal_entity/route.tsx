import { Skeleton } from "@sharpnr/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/legal_entity")({
  pendingMs: 0,
  pendingComponent: LegalEntityIndexSkeleton,
  component: Outlet,
});

function LegalEntityIndexSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Loading Message */}
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Skeleton className="h-3 w-3 rounded-full animate-pulse" />
        <span>Loading legal entities...</span>
      </div>

      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[260px]" />
        <Skeleton className="h-4 w-[420px]" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-[140px] rounded-lg" />
        <Skeleton className="h-10 w-[140px] rounded-lg" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  );
}
