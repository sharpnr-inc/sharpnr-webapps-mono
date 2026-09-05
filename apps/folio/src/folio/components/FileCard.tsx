import { Badge, Card, CardContent, toast } from "@sharpnr/ui";
import { MessageSquare, Star, Users } from "lucide-react";

import { kindLabel, type FolioFile } from "@/folio/data/library";
import { kindStyle } from "./file-kind";
import { useLibraryStore } from "@/store/LibraryStore";

export function FileCard({ file }: { file: FolioFile }) {
  const isStarred = useLibraryStore((s) => s.starredIds.includes(file.id));
  const toggleStar = useLibraryStore((s) => s.toggleStar);
  const Icon = kindStyle[file.kind].icon;

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardContent className="space-y-3 pt-1">
        <div className="flex items-start justify-between gap-2">
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${kindStyle[file.kind].tint}`}
          >
            <Icon className="size-4.5" />
          </div>

          <button
            onClick={() => toggleStar(file.id)}
            aria-label={isStarred ? "Remove star" : "Star file"}
            aria-pressed={isStarred}
            className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Star
              className={`size-4 ${isStarred ? "fill-current text-amber-500" : ""}`}
            />
          </button>
        </div>

        <div>
          <button
            onClick={() =>
              toast.info(`Opening ${file.name}`, {
                description: `The ${kindLabel[file.kind].toLowerCase()} editor is not built yet.`,
              })
            }
            className="line-clamp-2 text-left text-sm font-medium leading-snug hover:underline"
          >
            {file.name}
          </button>
          <p className="mt-1 text-xs text-muted-foreground">
            {kindLabel[file.kind]} · {file.workspace}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="truncate">{file.edited}</span>

          <span className="flex shrink-0 items-center gap-2.5">
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
        </div>

        {file.shared && (
          <Badge variant="secondary" className="text-[10px]">
            Shared
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
