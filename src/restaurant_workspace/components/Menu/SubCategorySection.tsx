import { useMenuStore } from "./store/MenuStore";
import { ALL_CATEGORY_ID } from "./store/MenuStore";
import { Button } from "@/components/ui/button";

const SubCategorySection = () => {
  const { categories, activeCategoryId, setActiveSubCategory } =
    useMenuStore();

  if (activeCategoryId === ALL_CATEGORY_ID) return null;

  const category = categories.find(
    (c) => c.id === activeCategoryId
  );

  return (
    <div className="flex gap-2">
      {category?.sub_categories.map((sub) => (
        <Button
          key={sub.id}
          variant="outline"
          onClick={() => setActiveSubCategory(sub.id)}
        >
          {sub.sub_cat_name}
        </Button>
      ))}
    </div>
  );
};

export default SubCategorySection;
