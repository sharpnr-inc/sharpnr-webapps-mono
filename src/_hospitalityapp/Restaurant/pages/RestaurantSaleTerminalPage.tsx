import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, ReceiptText } from "lucide-react";
import Menu from "@/_hospitalityapp/infra/Menu/menu/menu";
import MenuCart from "@/_hospitalityapp/infra/pos/Cart/MenuCart";

const RestaurantSaleTerminalPage: React.FC = () => {
  return (
    <div className="flex  w-full gap-4">
      <div className="w-full">
        <section className="flex flex-col flex-1 gap-2">
          <header className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
              <Input
                placeholder="Search items..."
                className="pl-10 border-black focus-visible:ring-black"
              />
            </div>
            {/* Module Tabs (Future Bar/Kitchen) */}
            <div className="flex gap-2">
              <Button variant="outline" className="border-black">
                All
              </Button>
              <Button variant="ghost">Kitchen</Button>
              <Button variant="ghost">Bar</Button>
            </div>
          </header>

          <Menu ownersID="53452cd3-5636-4465-a05d-e4dbc292eefc">
            <Menu.MenuCategories />
            <Separator />
            <Menu.MenuSubCategories />
            <Separator /> 
            <ScrollArea className="border p-2 h-[65vh]">
              <Menu.MenuItems className="relative" />
            </ScrollArea>

            <MenuCart>
              <MenuCart.MenuCartItems />
            </MenuCart>
          </Menu>
        </section>
      </div>

      <aside className="flex flex-col gap-4 max-h-[60vh] h-[50vh] w-1/3">
        <Card className="flex-1  border-2 border-black flex flex-col ">
          <CardHeader className="border-b border-black">
            <CardTitle className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5" />
              Current Order
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[450px] p-4">
              {/* Sample Order Line Items */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center mb-4"
                >
                  <div className="flex flex-col">
                    <span className="font-bold uppercase text-xs">
                      Classic Burger
                    </span>
                    <span className="text-xs opacity-60">Qty: 1 x $15.00</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t border-black p-4">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$45.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%)</span>
                <span>$4.50</span>
              </div>
              <Separator className="bg-black" />
              <div className="flex justify-between text-xl font-black">
                <span>TOTAL</span>
                <span>$49.50</span>
              </div>
            </div>

            <Button className="bg-black text-white w-full">PAYMENT</Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
};

export default RestaurantSaleTerminalPage;
