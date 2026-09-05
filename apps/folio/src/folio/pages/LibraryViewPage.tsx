import { useMemo, useState } from "react";
import { Button, Card, CardContent, Input } from "@sharpnr/ui";
import { LayoutGrid, List, Search } from "lucide-react";

import { kindLabel, trashed, type FileKind } from "@/folio/data/library";
import { FileCard } from "@/folio/components/FileCard";
import { FileRow } from "@/folio/components/FileRow";
import { useLibraryStore } from "@/store/LibraryStore";

/**
 * One page behind every library nav item.
 *
 * Recent, Starred, Shared and the per-type views are all the same list with a
 * different filter, so they share one component rather than seven near-copies
 * that would drift apart.
 */
export type LibraryFilter =
  | { type: "recent" }
  | { type: "starred" }
  | { type: "shared" }
  | { type: "trash" }
  | { type: "kind"; kind: FileKind };

export function LibraryViewPage({
  title,
  description,
  filter,
}: {
  title: string;
  description: string;
  filter: LibraryFilter;
}) {
  const files = useLibraryStore((s) => s.files);
  const starredIds = useLibraryStore((s) => s.starredIds);

  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("list");

  const results = useMemo(() => {
    const source = filter.type === "trash" ? trashed : files;

    const scoped = source.filter((file) => {
      if (filter.type === "starred") return starredIds.includes(file.id);
      if (filter.type === "shared") return file.shared;
      if (filter.type === "kind") return file.kind === filter.kind;
      return true;
    });

    const needle = query.trim().toLowerCase();
    if (!needle) return scoped;

    return scoped.filter((file) =>
      [file.name, file.workspace, file.editedBy, kindLabel[file.kind]]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [files, starredIds, filter, query]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="h-9 pl-8"
              aria-label={`Search ${title.toLowerCase()}`}
            />
          </div>

          <div className="flex rounded-md border p-0.5">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={`rounded p-1.5 transition-colors ${
                view === "grid"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={`rounded p-1.5 transition-colors ${
                view === "list"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-sm font-medium">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {query
              ? "No items match that search."
              : "Items will appear here as your team works."}
          </p>
          {query && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setQuery("")}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-1">
            {results.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default LibraryViewPage;
