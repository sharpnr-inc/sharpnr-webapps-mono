// src/context/SheetContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type SheetSize = "1/4" | "2/4" | "3/4";

interface SheetState {
  title?: string;
  description?: string;
  content?: ReactNode;
  size?: SheetSize;
  isOpen: boolean;
}

interface SheetContextProps {
  openSheet: (
    content: ReactNode,
    title?: string,
    description?: string,
    size?: SheetSize
  ) => void;
  closeSheet: () => void;
}

const SheetContext = createContext<SheetContextProps | undefined>(undefined);

export const useSheet = () => {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used inside SheetProvider");
  return ctx;
};

export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const [sheet, setSheet] = useState<SheetState>({
    isOpen: false,
    title: undefined,
    description: undefined,
    content: undefined,
    size: "2/4",
  });

  const openSheet = (
    content: ReactNode,
    title?: string,
    description?: string,
    size: SheetSize = "2/4"
  ) => {
    setSheet({ content, title, description, size, isOpen: true });
  };

  const closeSheet = () => {
    setSheet((prev) => ({ ...prev, isOpen: false }));
  };

  // Map fraction size to Tailwind width classes
  const getWidthClass = (size?: SheetSize) => {
    switch (size) {
      case "1/4":
        return "w-1/4";
      case "2/4":
        return "w-2/4";
      case "3/4":
        return "w-3/4";
      default:
        return "w-2/4";
    }
  };

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}

      <Sheet open={sheet.isOpen} onOpenChange={closeSheet} >
        <SheetContent side="right" className={`w-full max-w-none ${getWidthClass(sheet.size)}`} >
          <SheetHeader>
            {sheet.title && <SheetTitle>{sheet.title}</SheetTitle>}
            {sheet.description && <SheetDescription>{sheet.description}</SheetDescription>}
          </SheetHeader>

          <div className="py-2">{sheet.content}</div>

          <SheetFooter>
            <Button variant="default" onClick={closeSheet}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
};
