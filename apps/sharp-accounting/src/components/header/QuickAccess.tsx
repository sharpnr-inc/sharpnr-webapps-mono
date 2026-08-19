import { ChefHat, Wine } from "lucide-react";

/**
 * Workspace shortcuts rendered inside the UserCard's `quickAccess` slot.
 * App-specific content, so it stays here rather than in @sharpnr/ui.
 */
export function QuickAccess() {
  return (
    <>
      <button className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-accent transition-colors group">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40 transition-colors">
          <ChefHat className="h-3.5 w-3.5" />
        </div>
        <span className="flex-1 text-left">Kitchen</span>
      </button>

      <button className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-accent transition-colors group">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
          <Wine className="h-3.5 w-3.5" />
        </div>
        <span className="flex-1 text-left">Bar</span>
      </button>
    </>
  );
}
