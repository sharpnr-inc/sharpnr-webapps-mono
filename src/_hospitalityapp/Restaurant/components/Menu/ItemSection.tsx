import { useMenuStore, ALL_CATEGORY_ID } from "./store/MenuStore";
import { Card } from "@/components/ui/card";

const ItemSection = () => {
  const {
    categories,
    allItems,
    activeCategoryId,
    activeSubCategoryId,
    openVariant,
  } = useMenuStore();

  let items: any[] = [];

  if (activeCategoryId === ALL_CATEGORY_ID) {
    items = allItems;
  } else if (activeSubCategoryId) {
    const category = categories.find(
      (c) => c.id === activeCategoryId
    );

    const sub = category?.sub_categories.find(
      (s) => s.id === activeSubCategoryId
    );

    items = sub?.menu_items ?? [];
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="p-4 cursor-pointer"
          onClick={() => {
            useMenuStore.setState({ selectedItem: item });
            openVariant();
          }}
        >
          {item.name}
        </Card>
      ))}
    </div>
  );
};

export default ItemSection;
