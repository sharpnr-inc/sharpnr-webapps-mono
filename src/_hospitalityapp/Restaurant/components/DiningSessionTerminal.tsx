import { ScrollArea } from "@/components/ui/scroll-area";
import { useDiningSessionOrders } from "../apis/queries";
import MenuSection from "./Menu/MenuSection";
import OrderCart from "./OrderCart/OrderCart";
import OrderTable from "./OrderTable/OrderTable";

interface DiningSessionTerminalProps {
  table: any;
  restaurantID: string;
}

const DiningSessionTerminal: React.FC<DiningSessionTerminalProps> = ({
  table,
  restaurantID,
}) => {
  const { data: orders } = useDiningSessionOrders(
    restaurantID,
    table.CurrentDineSessionID,
  );

  return (
    <div className=" flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* LEFT SIDE (Menu + Cart) */}
        <div className="w-4/6 flex flex-col gap-4 overflow-hidden">
          {/* Menu Section */}
          <div className="flex-1 rounded-xl shadow-sm border overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b font-medium">Menu</div>

            <div className="flex-1 overflow-y-auto p-4">
              <MenuSection OwnerID={restaurantID[0]}>
                <MenuSection.CategorySection />
                <MenuSection.SubCategorySection />
                <ScrollArea className="h-[63vh]">
                  <MenuSection.ItemSection />
                </ScrollArea>
              </MenuSection>
            </div>
          </div>

          {/* Cart / KOT Section */}
          <OrderCart className="" />
        </div>

        {/* RIGHT SIDE (Tables Panel) */}
        <div className="w-2/6 rounded-xl shadow-sm border flex flex-col overflow-hidden">
          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default DiningSessionTerminal;
