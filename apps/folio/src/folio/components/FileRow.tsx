import { toast } from "@sharpnr/ui";
import { MessageSquare, Star, Users } from "lucide-react";

import { kindLabel, type FolioFile } from "@/folio/data/library";
import { kindStyle } from "./file-kind";
import { useLibraryStore } from "@/store/LibraryStore";

export function FileRow({ file }: { file: FolioFile }) {
  const isStarred = useLibraryStore((s) => s.starredIds.includes(file.id));
  const toggleStar = useLibraryStore((s) => s.toggleStar);
  const Icon = kindStyle[file.kind].icon;

  return (
    <div className="flex items-center gap-3 border-b px-2 py-2.5 last:border-b-0 hover:bg-muted/50">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-md ${kindStyle[file.kind].tint}`}
      >
        <Icon className="size-4" />
      </div>

      <button
        onClick={() =>
          toast.info(`Opening ${file.name}`, {
            description: `The ${kindLabel[file.kind].toLowerCase()} editor is not built yet.`,
          })
        }
        className="min-w-0 flex-1 text-left"
      >
        <p className="truncate text-sm font-medium hover:underline">
          {file.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {kindLabel[file.kind]} · {file.workspace} · {file.editedBy}
        </p>
      </button>

      <span className="hidden w-28 shrink-0 text-xs text-muted-foreground sm:block">
        {file.edited}
      </span>

      <span className="hidden w-16 shrink-0 text-right text-xs text-muted-foreground tabular-nums md:block">
        {file.size}
      </span>

      <span className="hidden w-20 shrink-0 items-center justify-end gap-2.5 text-xs text-muted-foreground lg:flex">
        {file.comments > 0 && (
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3.5" aria-hidden />
            {file.comments}
          </span>
        )}
        {file.shared && (
          <span className="flex items-center gap-1">
            <Users className="size-3.5" aria-hidden />
            {file.collaborators.length}
          </span>
        )}
      </span>

      <button
        onClick={() => toggleStar(file.id)}
        aria-label={isStarred ? "Remove star" : "Star file"}
        aria-pressed={isStarred}
        className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Star
          className={`size-4 ${isStarred ? "fill-current text-amber-500" : ""}`}
        />
      </button>
    </div>
  );
}
