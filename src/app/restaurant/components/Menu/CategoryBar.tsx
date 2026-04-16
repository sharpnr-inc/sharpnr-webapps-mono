import { useMenuStore } from "./store/MenuStore";
import { Button } from "@/components/ui/button";

const CategorySection = () => {
  const { categories, activeCategoryId, setActiveCategory } =
    useMenuStore();

  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={activeCategoryId === cat.id ? "default" : "outline"}
          onClick={() => setActiveCategory(cat.id)}
        >
          {cat.category_name}
        </Button>
      ))}
    </div>
  );
};

export default CategorySection;
