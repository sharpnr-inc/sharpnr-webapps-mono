import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
  toast,
} from "@sharpnr/ui";
import {
  FileText,
  FileType2,
  Folder,
  LayoutGrid,
  List,
  PenLine,
  Plus,
  Presentation,
  Search,
  Shapes,
  Sheet as SheetIcon,
  Star,
  StickyNote,
  Upload,
} from "lucide-react";

import {
  activity,
  kindLabel,
  workspaces,
  type FileKind,
} from "@/folio/data/library";
import { FileCard } from "@/folio/components/FileCard";
import { FileRow } from "@/folio/components/FileRow";
import { kindStyle } from "@/folio/components/file-kind";
import { useLibraryStore } from "@/store/LibraryStore";
import { useAppUserStore } from "@/store/AppUserStore";

/* ───────────────── Quick create ───────────────── */

const createOptions: { kind: FileKind; label: string; icon: React.ElementType }[] =
  [
    { kind: "doc", label: "Document", icon: FileText },
    { kind: "sheet", label: "Spreadsheet", icon: SheetIcon },
    { kind: "slides", label: "Presentation", icon: Presentation },
    { kind: "board", label: "Whiteboard", icon: Shapes },
    { kind: "note", label: "Note", icon: StickyNote },
    { kind: "markdown", label: "Markdown", icon: PenLine },
  ];

/** Filter chips over the whole library, in the order the docs list them. */
const typeFilters: { value: FileKind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "doc", label: "Documents" },
  { value: "sheet", label: "Sheets" },
  { value: "slides", label: "Slides" },
  { value: "pdf", label: "PDFs" },
  { value: "board", label: "Boards" },
  { value: "note", label: "Notes" },
  { value: "markdown", label: "Markdown" },
];

export function HomePage() {
  const { user } = useAppUserStore();
  const files = useLibraryStore((s) => s.files);
  const starredIds = useLibraryStore((s) => s.starredIds);
  const createFile = useLibraryStore((s) => s.createFile);

  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<FileKind | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const authorName = user
    ? `${user.firstName} ${user.lastName}`.trim() || "You"
    : "You";

  const starred = files.filter((f) => starredIds.includes(f.id));

  const recent = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return files.filter((file) => {
      if (kind !== "all" && file.kind !== kind) return false;
      if (!needle) return true;

      return [file.name, file.workspace, file.editedBy, kindLabel[file.kind]]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [files, query, kind]);

  const onCreate = (fileKind: FileKind, label: string) => {
    const file = createFile(
      fileKind,
      `Untitled ${label.toLowerCase()}`,
      workspaces[0].name,
      authorName,
    );

    toast.success(`${label} created`, {
      description: `${file.name} was added to ${file.workspace}.`,
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* ── Greeting ── */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
        <p className="text-sm text-muted-foreground">
          Documents, spreadsheets, slides, PDFs and boards — everything your
          team is working on, in one place.
        </p>
      </div>

      {/* ── Quick create ── */}
      <div className="flex flex-wrap gap-2">
        {createOptions.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.kind}
              onClick={() => onCreate(option.kind, option.label)}
              className="group flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5 text-sm transition-colors hover:bg-muted"
            >
              <span
                className={`flex size-7 items-center justify-center rounded-md ${kindStyle[option.kind].tint}`}
              >
                <Icon className="size-4" />
              </span>
              <span className="font-medium">{option.label}</span>
              <Plus className="size-3.5 text-muted-foreground" aria-hidden />
            </button>
          );
        })}

        <button
          onClick={() =>
            toast.info("Uploading arrives with the content API.", {
              description: "PDFs will be viewable and annotatable in place.",
            })
          }
          className="flex items-center gap-2.5 rounded-lg border border-dashed px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-muted">
            <Upload className="size-4" />
          </span>
          <span className="font-medium">Upload PDF</span>
        </button>
      </div>

      {/* ── Starred ── */}
      {starred.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-medium">
              <Star className="size-4 text-amber-500" aria-hidden />
              Starred
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/starred">View all</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {starred.slice(0, 4).map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </section>
      )}

      {/* ── Recent, with search / type filter / view toggle ── */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-medium">Recent</h2>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your library…"
                className="h-9 pl-8"
                aria-label="Search files"
              />
            </div>

            {/* Two views of the same list: cards to scan, rows to compare. */}
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

        <div className="mb-4 flex flex-wrap gap-1.5">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setKind(filter.value)}
              aria-pressed={kind === filter.value}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                kind === filter.value
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {recent.length === 0 ? (
          <div className="rounded-lg border border-dashed py-14 text-center">
            <p className="text-sm font-medium">Nothing matches that</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search, or clear the type filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setKind("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recent.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-1">
              {recent.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
            </CardContent>
          </Card>
        )}
      </section>

      {/* ── Workspaces + activity ── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Workspaces</h2>
            <p className="text-xs text-muted-foreground">
              Content lives in workspaces your team shares.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() =>
                    toast.info(`${workspace.name} workspace`, {
                      description: `${workspace.items} items · ${workspace.members} members`,
                    })
                  }
                  className="flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Folder className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {workspace.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {workspace.items} items · {workspace.members} members
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Recent activity</h2>
            <p className="text-xs text-muted-foreground">
              Comments, edits and shares across your workspaces
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <Separator className="mb-1" />
            <ul>
              {activity.map((event) => (
                <li key={event.id} className="border-b py-2.5 last:border-b-0">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{event.who}</span>{" "}
                    <span className="text-muted-foreground">
                      {event.action}
                    </span>{" "}
                    <span className="font-medium">{event.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {event.when}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* PDFs are the one type you cannot create from scratch here, so the
          quick-create row above deliberately offers upload instead. */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <FileType2 className="size-3.5" aria-hidden />
        <span>
          PDFs are viewed and annotated in place — they are uploaded, not
          created.
        </span>
        <Badge variant="secondary" className="ml-auto">
          {files.length} items
        </Badge>
      </div>
    </div>
  );
}

export default HomePage;
