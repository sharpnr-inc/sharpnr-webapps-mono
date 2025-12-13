import { BarInventoryData } from "@/dummy_data/inventory_data";
export default function InventoryBarInventorySection() {
  return (
    <div className="p-2 border rounded-xl shadow-sm">
      
     <div className="">
      {
        BarInventoryData.item.map((i)=>(<div className="p-2 border space-y-2">{i.item_name}</div>))
      }
     </div>
    </div>
  );
}
