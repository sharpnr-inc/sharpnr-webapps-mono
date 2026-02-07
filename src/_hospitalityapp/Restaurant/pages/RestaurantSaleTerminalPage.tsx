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
import { Search, Trash2, ReceiptText } from "lucide-react";
import Menu from "@/_hospitalityapp/infra/Menu/ui/Menu";

const RestaurantSaleTerminalPage: React.FC = () => {
  return (
    <div className="flex w-full gap-4 p-4 overflow-hidden">
      {/* LEFT: Product Catalog Section */}
      <section className="flex flex-col flex-1 gap-4">
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

        <ScrollArea className="flex-1 border-2 border-black rounded-lg p-4">
          <Menu moduleID="RESTAURANT_01">
            <Menu.Categories />
            <Menu.SubCategories>
              <Menu.Items />
            </Menu.SubCategories>
            <Menu.ItemSheet/>
            <Menu.CartSheet />
          </Menu>
        </ScrollArea>
      </section>

      {/* RIGHT: Order Summary Section */}
      <aside className="w-[400px] flex flex-col gap-4 max-h-[95vh] ">
        <Card className="flex-1 w-[400px] border-2 border-black flex flex-col fixed top-20 right-5">
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
                    <span className="font-bold uppercase text-sm">
                      Classic Burger
                    </span>
                    <span className="text-xs opacity-60">Qty: 1 x $15.00</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono">$15.00</span>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

            <div className="grid grid-cols-2 gap-2 w-full">
              <Button variant="outline" className="border-black w-full">
                CANCEL
              </Button>
              <Button className="bg-black text-white w-full">PAYMENT</Button>
            </div>
            <Button
              variant="secondary"
              className="w-full border border-black uppercase font-bold"
            >
              Send to Kitchen & Bar
            </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
};

export default RestaurantSaleTerminalPage;
