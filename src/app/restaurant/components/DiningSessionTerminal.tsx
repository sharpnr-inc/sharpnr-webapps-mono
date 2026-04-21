import { ScrollArea } from "@/components/ui/scroll-area";
import MenuSection from "./Menu/MenuSection";
import OrderCart from "./OrderCart/OrderCart";
import OrderTable from "./OrderTable/OrderTable";
import { Route } from "@/routes/_user/restaurant/$restaurantID/table-management/index";

interface DiningSessionTerminalProps {
  table: any;
}

const DiningSessionTerminal: React.FC<DiningSessionTerminalProps> = ({
  table,
}) => {
  const { restaurantID } = Route.useParams();
  console.log(restaurantID);

  return (
    // ✅ Give the root a real height so children can inherit it
    <div className="flex flex-col h-[95vh]">
      <div className="flex flex-1 p-4 gap-4 min-h-0">
        {/* LEFT SIDE */}
        <div className="w-4/6 flex flex-col gap-4 overflow-hidden min-h-0">
          <div className="flex-1 rounded-xl shadow-sm border overflow-hidden flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
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

          {restaurantID && (
            <OrderCart
              restaurantID={restaurantID}
              tableID={table.TableID}
              DiningSessionID={table.CurrentDineSessionID}
            />
          )}
        </div>

        {/* RIGHT SIDE ✅ min-h-0 lets it shrink within the flex row */}
        <div className="rounded-xl w-2/6 shadow-sm border flex flex-col min-h-0 overflow-hidden">
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
