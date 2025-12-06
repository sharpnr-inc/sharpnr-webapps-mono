import {
  useMenuGroup,
  useMenuGroupDetails,
} from "@/api_service/queries/HospitalityQueries/Menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createContext, useContext, useState } from "react";

// -----------------------------------------------------
// CONTEXT
// -----------------------------------------------------

type MenuContextType = {
  selectedCategory: string | null;
  setSelectedCategory: (id: string) => void;
};

// IMPORTANT FIX:
// Only undefined is allowed as default. Not null.
const MenuContext = createContext<MenuContextType | undefined>(undefined);

function useMenuTerminal() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("MenuTerminal *must be inside the <MenuTerminal>");
  return ctx;
}

// -----------------------------------------------------
// ROOT COMPONENT
// -----------------------------------------------------

export function MenuTerminal({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <MenuContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <div>{children}</div>
    </MenuContext.Provider>
  );
}

// -----------------------------------------------------
// HEADER
// -----------------------------------------------------

MenuTerminal.Header = function Header() {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <h2 className="text-xl font-semibold">Menu Terminal</h2>
    </div>
  );
};

// -----------------------------------------------------
// BODY WRAPPER
// -----------------------------------------------------

MenuTerminal.Body = function Body({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-4 h-[78vh]">{children}</div>;
};

// -----------------------------------------------------
// LEFT PANEL - CATEGORIES
// -----------------------------------------------------

MenuTerminal.Categories = function Categories() {
  const { data, isLoading, error } = useMenuGroup();
  const { selectedCategory, setSelectedCategory } = useMenuTerminal();

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <Card className="col-span-3 p-2 overflow-y-auto">
      <h3 className="font-medium mb-2">Categories</h3>

      <div className="flex flex-col gap-2">
        {data?.data?.map((cat: any) => (
          <Button
            key={cat.Id}
            variant={selectedCategory === cat.Id ? "default" : "secondary"}
            onClick={() => setSelectedCategory(cat.Id)}
            className="w-full justify-start"
          >
            {cat.Name}
          </Button>
        ))}
      </div>
    </Card>
  );
};

// -----------------------------------------------------
// RIGHT PANEL - ITEMS
// -----------------------------------------------------

MenuTerminal.Items = function Items() {
  const { selectedCategory } = useMenuTerminal();

const { data, isFetching, isLoading } = useMenuGroupDetails(
  selectedCategory ?? ""
);

  return (
    <Card className="col-span-9 p-2 overflow-y-auto">
      {!selectedCategory && (
        <div className="text-muted-foreground">Select a category</div>
      )}

      {isFetching && <div>Loading items...</div>}

      {data?.data && (
        <div className="grid grid-cols-3 gap-2">
          {data.data.map((item: any) => (
            <Card key={item.Id} className="p-3">
              <h4 className="font-semibold">{item.Name}</h4>
              <p className="text-sm text-muted-foreground">
                ₹{item.Price}
              </p>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

// -----------------------------------------------------
// FOOTER
// -----------------------------------------------------

MenuTerminal.Footer = function Footer() {
  return (
    <div className="p-3 border-t mt-auto">
      <p className="text-sm text-muted-foreground">© Terminal System</p>
    </div>
  );
};
