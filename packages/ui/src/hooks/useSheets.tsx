import { createContext, useContext, useState, type ReactNode } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTitle } from "../components/ui/sheet";
import { cn } from "../lib/utils";

type SheetSize = "1/4" | "2/4" | "3/4" | "full";

interface SheetState {
  content?: ReactNode;
  size?: SheetSize;
  isOpen: boolean;
}

interface SheetContextProps {
  openSheet: (content: ReactNode, size?: SheetSize) => void;
  closeSheet: () => void;
}

const SheetContext = createContext<SheetContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSheet = () => {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used inside SheetProvider");
  return ctx;
};

/**
 * Mobile-first so a fractional sheet still fills a phone screen.
 *
 * Every class here carries the same `data-[side=right]:` prefix as the
 * defaults it is replacing. SheetContent sets `data-[side=right]:w-3/4` and
 * `data-[side=right]:sm:max-w-sm`; tailwind-merge only dedupes within a single
 * variant group, so plain `w-1/4` / `max-w-none` did not replace them -- both
 * classes survived and the attribute selector won, pinning every sheet to
 * max-w-sm no matter which size was requested. Matching the prefix lets
 * tailwind-merge drop the default the way it was always meant to.
 */
const sizeClasses: Record<SheetSize, string> = {
  "1/4": "data-[side=right]:w-1/4 data-[side=right]:sm:max-w-none",
  "2/4": "data-[side=right]:w-full data-[side=right]:sm:w-2/4 data-[side=right]:sm:max-w-none",
  "3/4": "data-[side=right]:w-full data-[side=right]:sm:w-3/4 data-[side=right]:sm:max-w-none",
  full: "data-[side=right]:w-full data-[side=right]:sm:max-w-none",
};

export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const [sheet, setSheet] = useState<SheetState>({
    isOpen: false,
    content: undefined,
    size: "2/4",
  });

  const openSheet = (content: ReactNode, size: SheetSize = "2/4") => {
    setSheet({ content, size, isOpen: true });
  };

  const closeSheet = () => {
    setSheet((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}

      <Sheet open={sheet.isOpen} onOpenChange={closeSheet}>
        <SheetContent
          side="right"
          className={cn(
            "overflow-y-auto p-4",
            "[&::-webkit-scrollbar]:w-1.5",
            "[&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-slate-300",
            "hover:[&::-webkit-scrollbar-thumb]:bg-slate-400",
            sizeClasses[sheet.size ?? "2/4"],
          )}
        >
          {/* Radix requires a title on every sheet for screen readers. */}
          <VisuallyHidden>
            <SheetTitle>Sheet Dialog</SheetTitle>
          </VisuallyHidden>

          {sheet.content}
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
};
