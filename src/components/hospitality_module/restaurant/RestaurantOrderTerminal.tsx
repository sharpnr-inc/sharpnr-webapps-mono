import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useMenuGroup,
  useMenuGroupDetails,
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function RestaurantOrderTerminal({ tableId }: any) {
  const { data, isLoading, error } = useMenuGroup();
  const {
    data: menu,
    isLoading: menuIsLoading,
    error: menuIsError,
  } = useMenuGroupDetails("6d895262-0f68-4a45-9343-44bce60345fa");

  const [showPaymentBox, setShowPaymentBox] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const { data: sessData } = useBookingSession(tableId);

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>({});
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  if (isLoading || menuIsLoading) return <div>Loading...</div>;
  if (error || menuIsError) return <div>Error loading menus</div>;

  const menuGroups = data?.data ?? [];

  const handlePayAndClose = () => {
    setShowPaymentBox(true);
  };

  const handleConfirmPayment = () => {
    if (!paymentType) return alert("Select payment type first!");

    if (paymentType === "cash") {
      setShowPaymentBox(false);
      alert("Order closed with Cash Payment");
    }
  };

  const handleAddItem = (item: any) => {
    setSelectedMenuItem(item);
    setSelectedVariants({});
    setSelectedAddons([]);
    setQuantity(1);
    setNotes("");
    setIsVariantModalOpen(true);
  };

  const handleConfirmVariantSelection = () => {
    if (!selectedMenuItem) return;

    let finalPrice = parseFloat(selectedMenuItem.price);
    let itemName = selectedMenuItem.name;
    const variantDetails: string[] = [];

    for (const groupId in selectedVariants) {
      const variantId = selectedVariants[groupId];
      const group = selectedMenuItem.variant_groups.find(
        (vg: any) => vg.id === groupId
      );
      if (group) {
        const variant = group.variants.find((v: any) => v.id === variantId);
        if (variant) {
          finalPrice += parseFloat(variant.price);
          variantDetails.push(variant.name);
        }
      }
    }
    if (variantDetails.length > 0) {
      itemName += ` (${variantDetails.join(", ")})`;
    }

    const addonDetails: string[] = [];
    selectedAddons.forEach((addonId) => {
      const addon = selectedMenuItem.add_ons.find(
        (ao: any) => ao.ID === addonId
      );
      if (addon) {
        finalPrice += parseFloat(addon.Price);
        addonDetails.push(addon.Name);
      }
    });

    if (addonDetails.length > 0) {
      itemName += ` w/ ${addonDetails.join(", ")}`;
    }

    const newItem = {
      item: itemName,
      status: "Preparing",
      category: selectedMenuItem.category?.name || "Food",
      amount: (finalPrice * quantity).toFixed(2),
      quantity: quantity,
      notes: notes,
    };

    setOrderItems([...orderItems, newItem]);

    setIsVariantModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isVariantModalOpen}
        onOpenChange={(isOpen) => {
          setIsVariantModalOpen(isOpen);
          if (!isOpen) {
            setSelectedMenuItem(null);
            setSelectedVariants({});
            setSelectedAddons([]);
            setQuantity(1);
            setNotes("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize {selectedMenuItem?.name}</DialogTitle>
          </DialogHeader>
          {selectedMenuItem && (
            <div>
              {selectedMenuItem.variant_groups?.map((vg: any) => (
                <div key={vg.id} className="mb-4">
                  <h4 className="font-semibold">{vg.name}</h4>
                  <RadioGroup
                    onValueChange={(value) =>
                      setSelectedVariants((prev) => ({
                        ...prev,
                        [vg.id]: value,
                      }))
                    }
                  >
                    {vg.variants.map((variant: any) => (
                      <div
                        key={variant.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={variant.id} id={variant.id} />
                        <Label htmlFor={variant.id}>
                          {variant.name} (+₹{variant.price})
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              {selectedMenuItem.add_ons?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold">Add-ons</h4>
                  {selectedMenuItem.add_ons.map((addon: any) => (
                    <div
                      key={addon.ID}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={addon.ID}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAddons((prev) => [...prev, addon.ID]);
                          } else {
                            setSelectedAddons((prev) =>
                              prev.filter((id) => id !== addon.ID)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={addon.ID}>
                        {addon.Name} (+₹{addon.Price})
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value, 10) || 1)
                    }
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="E.g., extra spicy, no onions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsVariantModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmVariantSelection}>
              Add to Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
              Add Custom Charge
            </Button>
          </div>

          {/* TABLE */}
          <div>
            <Table>
              <TableCaption>Items added to the current order</TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Item</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price (₹)</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orderItems.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {row.item}
                      {row.notes && (
                        <p className="text-xs text-gray-500">
                          Note: {row.notes}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell className="text-right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Grand Total</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹
                    {orderItems
                      .reduce(
                        (acc, item) => acc + parseFloat(item.amount),
                        0
                      )
                      .toFixed(2)}
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
              className="p-1"
            >
              {/* TAB BUTTONS */}
              <TabsList className="mb-2">
                {menuGroups.map((group: any) => (
                  <TabsTrigger
                    key={group.Id}
                    value={group.Type.toLowerCase()}
                  >
                    {group.Name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* SEARCH */}
              <Input placeholder="Search Item" className="mb-2" />

              {/* BAR MENU */}
              <TabsContent value="bar" className="text-xs">
                <div className="space-y-3">
                  {menu.data.map((ct: any) => (
                    <div key={ct.id} className="space-y-2">
                      {/* CATEGORY */}
                      <div className="font-semibold text-xs">{ct.name}</div>

                      {ct.description && (
                        <p className="text-xs opacity-70 line-clamp-1">
                          {ct.description}
                        </p>
                      )}

                      {/* SUB-CATEGORIES */}
                      <div className="space-y-2">
                        {ct.sub_categories?.map((sb: any) => (
                          <div
                            key={sb.id}
                            className="border p-2 rounded-lg space-y-2"
                          >
                            <h3 className="text-xs font-semibold">
                              {sb.name}
                            </h3>

                            {sb.description && (
                              <p className="text-xs opacity-60 line-clamp-1">
                                {sb.description}
                              </p>
                            )}

                            {/* MENU ITEMS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {sb.menu_items?.map((mi: any) => (
                                <div
                                  key={mi.id}
                                  className="border p-2 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                                >
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-bold text-sm">
                                        {mi.name}
                                      </h4>
                                      <span className="font-bold text-sm">
                                        ₹{mi.price}
                                      </span>
                                    </div>

                                    {(mi.variant_groups?.length > 0 ||
                                      mi.add_ons?.length > 0) && (
                                      <p className="text-xs text-gray-400 mt-1">
                                        Customizable
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex justify-end mt-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 px-2"
                                      onClick={() => handleAddItem(mi)}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                </div>
                              ))}

                              {/* Empty state */}
                              {!sb.menu_items?.length && (
                                <p className="text-xs italic opacity-60">
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
    </>
  );
}


