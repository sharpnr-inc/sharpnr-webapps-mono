export function ChartOfAccountPage() {
  return (
    <div className="h-full w-full overflow-auto p-2 space-y-6">
      <h1 className="text-xl font-semibold">Chart of Accounts</h1>

      {/* Skeleton blocks */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="h-32 rounded-lg border bg-muted/40 animate-pulse"
        >
          <div className="p-4 space-y-3">
            <div className="h-4 w-1/3 bg-muted rounded" />
            <div className="h-3 w-2/3 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
