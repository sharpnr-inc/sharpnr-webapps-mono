import { useDialogModal } from "@/context/DialogModalContext";
import AddItemInMenuForm from "../forms/AddItemInMenuForm";
import { Button } from "@/components/ui/button";
import { barMenu } from "@/dummy_data/menu_data"; // ✅ make sure your dummy data is exported from this path

export default function MenuBarMenuSection() {
  const { openModal } = useDialogModal();

  const AddItemInMenu = () => {
    openModal(<AddItemInMenuForm />, "", "");
  };

  return (
    <div className="p-4 border rounded-2xl shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Bar Menu</h2>
        <Button onClick={AddItemInMenu}>Add Item</Button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {barMenu.items.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
          >
            {/* Name & Category */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold ">{item.name}</h3>
              <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {item.category}
              </span>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Sizes */}
            {item.sizes && item.sizes.length > 0 && (
              <div className="mt-2">
                <span className="text-xs">Sizes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.sizes.map((size) => (
                    <span
                      key={size.id}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                    >
                      {size.name} ({size.quantity}ml)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            {item.price && (
              <div className="mt-3 text-right">
                <span className="text-sm font-semibold">₹{item.price}</span>
              </div>
            )}

            <Button size={"sm"}>Edit Items</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
