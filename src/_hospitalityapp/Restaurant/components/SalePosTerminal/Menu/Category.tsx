import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";

export function Category() {
  const items = useSalePosTerminalMenuStore((s) => s.items);

  if (!items.length) return <div>No menu items found</div>;

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border p-3 hover:bg-muted transition"
        >
          <div className="font-medium">{item.name}</div>

          <div className="text-sm text-muted-foreground">
            {item.description}
          </div>

          <div className="mt-2 font-semibold">₹{item.base_price}</div>
        </div>
      ))}
    </div>
  );
}
