import { cn } from "@/lib/utils";
import { useMenuStore } from "../stores/Menu/menu_store";
import { useMenuCtx } from "./menu.context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface MenuItemProps {
  className?: string;
}

const MenuItems = ({ className }: MenuItemProps) => {
  const { dummyMenuData } = useMenuCtx();
  const { activeSubCategoryID } = useMenuStore();

  // Find SubCategory from all categories
  const subCategory = dummyMenuData.menuCategory
    .flatMap((cat) => cat.menuSubCategory)
    .find((sub) => sub.id === activeSubCategoryID);

  const items = subCategory?.menu_item ?? [];

  // Fallback 1
  if (!activeSubCategoryID) {
    return (
      <div className="text-muted-foreground">
        Please select a sub category first
      </div>
    );
  }

  // Fallback 2
  if (items.length === 0) {
    return <div className="text-muted-foreground">No menu items available</div>;
  }

  return (
    <div className={cn("grid grid-cols-3 lg:grid-cols-5 gap-4", className)}>
      {items.map((item) => (
        <Card
          key={item.id}
          className="h-full text-sm hover:border-accent-foreground cursor-pointer"
          onClick={() => console.log(item.id)}
        >
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="text-sm font-medium">
              Base Price: ₹{item.base_price}
            </div>

            <div className="text-xs text-muted-foreground">
              {item.dietaryType}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuItems;
