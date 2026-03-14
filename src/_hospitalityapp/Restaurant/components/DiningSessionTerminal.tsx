import { ScrollArea } from "@/components/ui/scroll-area";
import MenuSection from "./Menu/MenuSection";
import OrderCart from "./OrderCart/OrderCart";
import OrderTable from "./OrderTable/OrderTable";
import { useSelectedRestaurantID } from "../store/selectors";

interface DiningSessionTerminalProps {
  table: any;
}

const DiningSessionTerminal: React.FC<DiningSessionTerminalProps> = ({
  table,
}) => {
  const restaurantID = useSelectedRestaurantID();

  return (
    <div className=" flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* LEFT SIDE (Menu + Cart) */}
        <div className="w-4/6 flex flex-col gap-4 overflow-hidden">
          {/* Menu Section */}
          <div className="flex-1 rounded-xl shadow-sm border overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {restaurantID ? (
                <MenuSection OwnerID={restaurantID}>
                  <MenuSection.CategorySection />
                  <MenuSection.SubCategorySection />

                  <ScrollArea className="h-[65vh]">
                    <MenuSection.ItemSection />
                  </ScrollArea>
                </MenuSection>
              ) : null}
            </div>
          </div>

          {/* Cart / KOT Section */}
          {restaurantID && (
            <OrderCart
              className=""
              restaurantID={restaurantID}
              tableID={table.TableID}
              DiningSessionID={table.CurrentDineSessionID}
            />
          )}
        </div>

        {/* RIGHT SIDE (Tables Panel) */}
        <div className="w-2/6 rounded-xl shadow-sm border flex flex-col overflow-hidden">
          {restaurantID && (
            <OrderTable
              diningSessionID={table.CurrentDineSessionID}
              restaurantID={restaurantID}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiningSessionTerminal;
