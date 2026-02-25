// LauncherSkeleton.tsx
export const LauncherSkeleton = () => (
  <div className="grid grid-cols-3 gap-x-2 gap-y-4 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex flex-col items-center gap-2">
        <div className="h-14 w-14 rounded-2xl bg-muted" />
        <div className="h-2 w-10 rounded bg-muted" />
      </div>
    ))}
  </div>
);