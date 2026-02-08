import React, { createContext, useContext, useEffect } from "react";
import { useMenuStore } from "../stores/Menu/menu_store";
import { menuActions } from "../stores/Menu/action";
import { DUMMY_MENU_DATA } from "@/__dummy_data__/Menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// --- TYPES ---
type MenuSubComponents = {
  Categories: React.FC;
  SubCategories: React.FC<{ children: React.ReactNode }>;
  Items: React.FC;
  ItemSheet: React.FC;
  CartSheet: React.FC;
};

interface MenuComponent extends React.FC<{ moduleID: string; children: React.ReactNode }> {}

const MenuDataContext = createContext<any>(null);
const useMenuData = () => useContext(MenuDataContext);

/**
 * ROOT MENU PROVIDER
 */
const MenuBase: React.FC<{ moduleID: string; children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    menuActions.addMenuInStore(DUMMY_MENU_DATA);
  }, []);

  const menuGroups = useMenuStore((s: any) => s.menuGroups);
  const activeGroupID = useMenuStore((s: any) => s.activeMenuGroupID);
  const activeGroup = menuGroups.find((g: any) => g.ID === activeGroupID);

  return (
    <MenuDataContext.Provider value={activeGroup}>
      <div className="flex flex-col bg-white text-black font-sans uppercase min-h-screen">
        {children}
      </div>
    </MenuDataContext.Provider>
  );
};

/**
 * 1. CATEGORIES (Top Horizontal Bar)
 */
const Categories = () => {
  const group = useMenuData();
  const activeCatID = useMenuStore((s: any) => s.activeCategoryID);

  if (!group) return null;

  return (
    <div className="flex border-b-4 border-black overflow-x-auto no-scrollbar bg-white sticky top-0 z-10">
      {group.Categories?.map((cat: any) => (
        <button
          key={cat.ID}
          onClick={() => menuActions.setCategory(cat.ID)}
          className={`px-8 py-4 text-sm font-black border-r-2 border-black transition-all shrink-0 ${
            activeCatID === cat.ID ? "bg-black text-white" : "bg-white hover:bg-gray-100"
          }`}
        >
          {cat.Name}
        </button>
      ))}
    </div>
  );
};

/**
 * 2. SUBCATEGORIES (Secondary Filter)
 */
const SubCategories = ({ children }: { children: React.ReactNode }) => {
  const group = useMenuData();
  const activeCatID = useMenuStore((s: any) => s.activeCategoryID);
  const activeSubID = useMenuStore((s: any) => s.activeSubCategoryID);

  const activeCategory = group?.Categories?.find((c: any) => c.ID === activeCatID);
  if (!activeCategory) return null;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex gap-4 p-4 border-b-2 border-black bg-gray-50 overflow-x-auto no-scrollbar">
        {activeCategory.SubCategories?.map((sub: any) => (
          <button
            key={sub.ID}
            onClick={() => menuActions.setSubCategory(sub.ID)}
            className={`px-4 py-1 border-2 border-black text-xs font-bold shrink-0 ${
              activeSubID === sub.ID ? "bg-black text-white" : "bg-white"
            }`}
          >
            {sub.Name}
          </button>
        ))}
      </div>
      <MenuDataContext.Provider value={activeCategory.SubCategories?.find((s: any) => s.ID === activeSubID)}>
        <div className="p-4">{children}</div>
      </MenuDataContext.Provider>
    </div>
  );
};

/**
 * 3. ITEMS (The Grid)
 */
const Items = () => {
  const activeSub = useMenuData();
  if (!activeSub) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
      {activeSub.Items?.map((item: any) => (
        <button
          key={item.ID}
          onClick={() => menuActions.openItemEditor(item)}
          className="group flex flex-col items-start p-4 border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-left bg-white active:translate-y-1 active:shadow-none"
        >
          <span className="text-[9px] border border-black px-1 mb-2 font-black">
            {item.IsVeg ? "○ VEG" : "● NON-VEG"}
          </span>
          <h4 className="font-black text-sm leading-tight mb-1">{item.Name}</h4>
          <span className="mt-auto font-black text-sm">${item.BasePrice.toFixed(2)}</span>
        </button>
      ))}
    </div>
  );
};

/**
 * 4. ITEM CUSTOMIZATION SHEET (Bottom)
 */
const ItemSheet = () => {
  const { isItemSheetOpen, activeItemForSlider } = useMenuStore((s: any) => s);
  if (!activeItemForSlider) return null;

  return (
    <Sheet open={isItemSheetOpen} onOpenChange={(open) => !open && menuActions.closeItemEditor()}>
      <SheetContent side="bottom" className="h-[85vh] bg-white border-t-4 border-black p-0 flex flex-col uppercase outline-none">
        <div className="p-6 overflow-y-auto flex-1 no-scrollbar">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-4xl font-black tracking-tighter">{activeItemForSlider.Name}</SheetTitle>
            <SheetDescription className="font-bold opacity-60 normal-case italic">{activeItemForSlider.Description}</SheetDescription>
          </SheetHeader>
          
          <div className="space-y-8">
            {activeItemForSlider.VariantGroups?.map((group: any) => (
              <div key={group.ID} className="border-t-2 border-black pt-4">
                <h3 className="font-black text-xs mb-4 tracking-widest">{group.Name}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {group.Variants?.map((v: any) => (
                    <button key={v.ID} className="border-2 border-black p-4 font-black text-xs text-left flex justify-between hover:bg-black hover:text-white transition-all">
                      <span>{v.Name}</span>
                      <span>+${v.Price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t-4 border-black">
          <button className="w-full bg-black text-white p-5 font-black text-xl flex justify-between items-center hover:bg-zinc-800" onClick={menuActions.closeItemEditor}>
            <span>ADD_TO_CART</span>
            <span>${activeItemForSlider.BasePrice.toFixed(2)}</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/**
 * 5. CART SHEET (Bottom)
 */
const CartSheet = () => {
  const isCartOpen = useMenuStore((s: any) => s.isCartSheetOpen);

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => menuActions.toggleCart(open)}>
      <SheetContent 
        side="bottom" 
        className="h-[10vh] z-[999px] bg-white border-t-4 border-black p-0 flex flex-col uppercase outline-none"
      >
        {/* Inverted Header for distinction */}
        <div className="p-6 border-b-4 border-black bg-black text-white flex justify-between items-center">
          <SheetHeader className="text-left">
            <SheetTitle className="text-3xl font-black tracking-tighter text-white">ORDER_REVIEW</SheetTitle>
          </SheetHeader>
          <button 
            onClick={() => menuActions.toggleCart(false)}
            className="border-2 border-white px-3 py-1 text-xs font-black hover:bg-white hover:text-black"
          >
            [CLOSE]
          </button>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto no-scrollbar">
          {/* Cart Empty Placeholder */}
          <div className="border-4 border-black border-dashed p-12 text-center flex flex-col items-center justify-center opacity-30">
            <span className="font-black text-2xl tracking-tighter">YOUR_ORDER_IS_EMPTY</span>
            <p className="normal-case text-xs font-bold mt-2">Add items from the menu to get started.</p>
          </div>
        </div>

        <div className="p-6 border-t-4 border-black bg-gray-50">
          <div className="flex justify-between font-black text-2xl mb-6">
            <span>TOTAL_AMOUNT</span>
            <span>$0.00</span>
          </div>
          <button className="w-full bg-black text-white p-6 font-black text-xl hover:bg-zinc-800 transition-all active:scale-[0.98]">
            SUBMIT_TO_KITCHEN
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// --- NAMESPACING ---
const Menu = MenuBase as MenuComponent & MenuSubComponents;
Menu.Categories = Categories;
Menu.SubCategories = SubCategories;
Menu.Items = Items;
Menu.ItemSheet = ItemSheet;
Menu.CartSheet = CartSheet;

export default Menu;