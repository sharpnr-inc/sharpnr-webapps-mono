import { cn } from "@/lib/utils";
import { useMenuStore, ALL_CATEGORY_ID } from "./store/MenuStore";

interface ItemSectionProps {
  className?: string;
}
const ItemSection: React.FC<ItemSectionProps> = ({ className }) => {
  const { categories, allItems, activeCategoryId, activeSubCategoryId } =
    useMenuStore();

  let items: any[] = [];

  if (activeCategoryId === ALL_CATEGORY_ID) {
    items = allItems;
  } else if (activeSubCategoryId) {
    const category = categories.find((c) => c.id === activeCategoryId);

    const sub = category?.sub_categories.find(
      (s) => s.id === activeSubCategoryId,
    );

    items = sub?.menu_items ?? [];
  }

  return (
    <div className={cn("grid grid-cols-8 gap-2", className)}>
      {items.map((item) => {
        const selectMenuItem = (item: any) => {
          console.log(item);

          /*
          Here we have to add the check the the Item if it 
          have Varaint Group then we send the Varaints Groups
          and in Varaint we Check if the they have the Addons then we add the Varinant in the Cart
          */
        };
        return (
          <div
            key={item.id}
            className="p-2 rounded-xl bg-card cursor-pointer border"
            onClick={() => {
              selectMenuItem(item);
            }}
          >
            <div>
              <p className="text-sm">{item.name}</p>
              <p className="text-green-400 text- font-mono">
                {item.base_price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemSection;
