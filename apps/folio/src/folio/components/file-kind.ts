import {
  FileText,
  FileType2,
  PenLine,
  Presentation,
  Shapes,
  Sheet as SheetIcon,
  StickyNote,
} from "lucide-react";

import type { FileKind } from "@/folio/data/library";

/**
 * Icon and tint per content type.
 *
 * A plain module rather than a component file: the tint is data, and keeping
 * it out of a `.tsx` avoids exporting a constant beside a component, which
 * breaks fast refresh.
 *
 * The tint decorates the icon chip only -- never the text -- so a file type is
 * always readable from its label and never from colour alone.
 */
export const kindStyle: Record<
  FileKind,
  { icon: React.ElementType; tint: string }
> = {
  doc: {
    icon: FileText,
    tint: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  sheet: {
    icon: SheetIcon,
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  slides: {
    icon: Presentation,
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  pdf: {
    icon: FileType2,
    tint: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  board: {
    icon: Shapes,
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  note: {
    icon: StickyNote,
    tint: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
  markdown: {
    icon: PenLine,
    tint: "bg-slate-500/10 text-slate-600 dark:text-slate-300",
  },
};
