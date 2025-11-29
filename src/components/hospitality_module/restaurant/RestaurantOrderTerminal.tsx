import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useMenuGroup,
  useMenuGroupDetails,
  useVariantOfMenuItem,
} from "@/api_service/queries/HospitalityQueries/Menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingSession } from "@/api_service/queries/HospitalityQueries/Restaurant";

export function RestaurantOrderTerminal() {
  const { data, isLoading, error } = useMenuGroup();
  const {
    data: menu,
    isLoading: menuIsLoading,
    error: menuIsError,
  } = useMenuGroupDetails("6d895262-0f68-4a45-9343-44bce60345fa");

  const [showPaymentBox, setShowPaymentBox] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const {data:sessData}=useBookingSession("9fbfc403-8889-432c-a13d-a60bd7959b2f");

  if (isLoading || menuIsLoading) return <div>Loading...</div>;
  if (error || menuIsError) return <div>Error loading menus</div>;

  const menuGroups = data?.data ?? [];

  const invoices = [
    {
      item: "Pizza Margherita",
      status: "Preparing",
      category: "Food",
      amount: "299.00",
    },
    {
      item: "Cold Coffee",
      status: "Served",
      category: "Beverage",
      amount: "129.00",
    },
    {
      item: "Garlic Bread",
      status: "Preparing",
      category: "Side",
      amount: "159.00",
    },
  ];

  const handlePayAndClose = () => {
    setShowPaymentBox(true);
  };

  const handleConfirmPayment = () => {
    if (!paymentType) return alert("Select payment type first!");

    // dummy: if cash selected, close popup
    if (paymentType === "cash") {
      setShowPaymentBox(false);
      alert("Order closed with Cash Payment");
    }
  };

  return (
    <div className="flex p-2 gap-2">
      {/* LEFT SIDE */}
     
        <div className="w-6/12 space-y-3 border p-4 rounded-lg h-full max-h-[calc(90vh-8.5rem)] overflow-y-scroll relative">
          {/* CUSTOMER INPUT */}
          <div>
            <Input placeholder="Enter Customer Mobile Number" />
          </div>

          {/* ACTION BUTTONS */}
          <div className="place-content-end flex gap-4">
            <Button size="sm" variant="outline">
              Add Menu Item
            </Button>
            <Button size="sm" variant="outline">
              Add Custom Charge
            </Button>
          </div>

          {/* TABLE */}
          <div>
            <Table>
              <TableCaption>Items added to the current order</TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price (₹)</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invoices.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{row.item}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell className="text-right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Grand Total</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹587.00
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* CHECKOUT BUTTONS */}
          <div className="place-content-end flex gap-4">
            <Button size="sm" variant="outline">
              Generate Invoice
            </Button>

            <Button size="sm" variant="default" onClick={handlePayAndClose}>
              Pay & Close
            </Button>
          </div>

          {/* PAYMENT INPUT */}
          <div>
            <Input placeholder="Customer UPI ID (optional)" />
          </div>

          <div className="place-content-end flex gap-4">
            <Button size="sm" variant="outline">
              Send UPI Payment Request
            </Button>
          </div>

          {/* PAYMENT TYPE POPUP */}
          {showPaymentBox && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-80 space-y-4 shadow-lg">
                <h2 className="text-lg font-semibold">Select Payment Type</h2>

                <Select onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentBox(false)}
                  >
                    Cancel
                  </Button>

                  <Button onClick={handleConfirmPayment}>
                    Confirm Payment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
     

      {/* RIGHT SIDE */}
      <div className="w-6/12 border p-2 rounded-lg max-h-[calc(90vh-8.5rem)] overflow-y-scroll">
        <div className="p-2">
          <Tabs
            defaultValue={menuGroups[0]?.Type.toLowerCase()}
            className="p-2"
          >
            {/* TAB BUTTONS */}
            <TabsList className="mb-2">
              {menuGroups.map((group: any) => (
                <TabsTrigger key={group.Id} value={group.Type.toLowerCase()}>
                  {group.Name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* SEARCH */}
            <Input placeholder="Search Item" className="mb-3" />

            {/* BAR MENU */}
            <TabsContent value="bar" className="text-xs">
              <div className="space-y-6">
                {menu.data.map((ct: any) => (
                  <div key={ct.id} className="space-y-4">
                    {/* CATEGORY */}
                    <div className=" font-semibold">{ct.name}</div>

                    {ct.description && (
                      <p className="text-sm opacity-80 line-clamp-2">
                        {ct.description}
                      </p>
                    )}

                    {/* SUB-CATEGORIES */}
                    <div className="space-y-4">
                      {ct.sub_categories?.map((sb: any) => (
                        <div
                          key={sb.id}
                          className="border p-4 rounded-xl space-y-3"
                        >
                          <h3 className="text-lg font-semibold">{sb.name}</h3>

                          {sb.description && (
                            <p className="text-sm opacity-70 line-clamp-2">
                              {sb.description}
                            </p>
                          )}

                          {/* MENU ITEMS */}
                          <div className="space-y-4">
                            {sb.menu_items?.map((mi: any) => (
                              <div
                                key={mi.id}
                                className="border p-4 rounded-xl space-y-3 transition-transform hover:scale-[1.01]"
                              >
                                {/* ITEM NAME & PRICE */}
                                <div className="flex justify-between">
                                  <div className="font-medium text-base">
                                    {mi.name}
                                  </div>
                                  <div className="font-semibold">
                                    ₹{mi.price}
                                  </div>
                                </div>

                                {mi.description && (
                                  <p className="text-sm opacity-70 line-clamp-2">
                                    {mi.description}
                                  </p>
                                )}

                                {/* VARIANT GROUPS */}
                                {mi.variant_groups?.length > 0 && (
                                  <div className="space-y-3">
                                    {mi.variant_groups.map((vg: any) => (
                                      <div
                                        key={vg.id}
                                        className="rounded-lg border p-3 space-y-2"
                                      >
                                        <div className="font-medium">
                                          {vg.name}
                                        </div>

                                        <div className="space-y-1">
                                          {vg.variants.map((vr: any) => (
                                            <div
                                              key={vr.id}
                                              className="flex justify-between text-sm"
                                            >
                                              <span>{vr.name}</span>
                                              <span>₹{vr.price}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* ADD-ONS */}
                                {mi.add_ons?.length > 0 && (
                                  <div className="space-y-2">
                                    <div className="font-medium">Add-ons</div>

                                    <div className="space-y-1">
                                      {mi.add_ons.map((ao: any) => (
                                        <div
                                          key={ao.ID}
                                          className="flex justify-between text-sm"
                                        >
                                          <span>{ao.Name}</span>
                                          <span>₹{ao.Price}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}

                            {/* Empty state */}
                            {!sb.menu_items?.length && (
                              <p className="text-sm italic opacity-60">
                                No items available
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
