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
 * Mobile-first so a fractional sheet still fills a phone screen. These go
 * through `cn`, not a template string -- `SheetContent` needs `max-w-none` to
 * drop shadcn's default cap, and tailwind-merge is what keeps the width here
 * from colliding with it.
 */
const sizeClasses: Record<SheetSize, string> = {
  "1/4": "w-1/4",
  "2/4": "w-full sm:w-2/4",
  "3/4": "w-full sm:w-3/4",
  full: "w-full",
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
            "max-w-none overflow-y-auto p-4",
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
