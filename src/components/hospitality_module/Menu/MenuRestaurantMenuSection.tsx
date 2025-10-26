"use client";

import React, { useState } from "react";
import { res_menu as initialMenu } from "@/dummy_data/res_menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useFormsModal } from "@/context/FormModalContext";

export default function MenuRestaurantMenuSection() {
  const [resMenu, setResMenu] = useState(initialMenu);
  const [selectedVariant, setSelectedVariant] = useState<Record<number, number>>(
    {}
  );
  const [cart, setCart] = useState<any[]>([]);

  const { showModal } = useFormsModal();

  // --- Add new menu item ---
  const handleAddMenuItem = (categoryId: number) => {
    showModal(
      "Add New Menu Item",
      "Fill in the details to add a new menu item.",
      <AddMenuItemForm
        categoryId={categoryId}
        onSubmit={(newItem) => {
          setResMenu((prev) =>
            prev.map((cat) =>
              cat.categoryId === categoryId
                ? { ...cat, items: [...cat.items, newItem] }
                : cat
            )
          );
        }}
      />
    );
  };

  // --- Add to Cart ---
  const handleAddToCart = (item: any) => {
    const variant =
      item.variants.find(
        (v: any) => v.variantId === selectedVariant[item.itemId]
      ) || item.variants[0];

    const existing = cart.find(
      (c) => c.itemId === item.itemId && c.variantId === variant.variantId
    );

    if (existing) {
      setCart((prev) =>
        prev.map((c) =>
          c.itemId === item.itemId && c.variantId === variant.variantId
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          itemId: item.itemId,
          name: item.name,
          price: variant.price,
          qty: 1,
          variantId: variant.variantId,
          variantName: variant.name,
          image: item.image,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (itemId: number, variantId: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.itemId === itemId && item.variantId === variantId)
      )
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* HEADER + ADD ITEM BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">🍽 Restaurant Menu</h1>

        <div className="flex flex-wrap gap-2">
          {resMenu.map((category) => (
            <Button
              key={category.categoryId}
              variant="outline"
              onClick={() => handleAddMenuItem(category.categoryId)}
            >
              + Add Item to {category.categoryName}
            </Button>
          ))}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Cart ({cart.length})
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] p-4 flex flex-col"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                  🛒 Your Cart
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 mt-4 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground mt-10">
                    Your cart is empty.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <Card key={index} className="flex items-center gap-3 p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {item.variantName}
                          </p>
                          <p className="text-sm font-semibold">
                            ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            handleRemoveFromCart(item.itemId, item.variantId)
                          }
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <SheetFooter className="flex flex-col gap-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <Button className="w-full text-lg py-5">
                      Proceed to Checkout
                    </Button>
                  </SheetFooter>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* MENU */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {resMenu.map((category) => (
          <AccordionItem
            key={category.categoryId}
            value={`cat-${category.categoryId}`}
            className="border rounded-lg shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-xl font-semibold bg-muted/30 hover:bg-muted/50 rounded-t-lg flex justify-between items-center">
              <span>{category.categoryName}</span>
              <Badge className="bg-primary text-white">
                {category.items.length} Items
              </Badge>
            </AccordionTrigger>

            <AccordionContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {category.items.map((item) => (
                  <Card
                    key={item.itemId}
                    className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                      />
                      <Badge
                        className={`absolute top-2 left-2 ${
                          item.isVeg ? "bg-green-600" : "bg-red-600"
                        } text-white`}
                      >
                        {item.isVeg ? "Veg" : "Non-Veg"}
                      </Badge>
                    </div>

                    <CardHeader className="pb-1">
                      <CardTitle className="text-lg font-semibold">
                        {item.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-2">
                      <div className="text-sm text-muted-foreground">
                        <strong>Variants:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.variants.map((variant) => (
                            <Button
                              key={variant.variantId}
                              size="sm"
                              variant={
                                selectedVariant[item.itemId] === variant.variantId
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                setSelectedVariant((prev) => ({
                                  ...prev,
                                  [item.itemId]: variant.variantId,
                                }))
                              }
                            >
                              {variant.name} ₹{variant.price}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm mt-1">
                        <strong>Add-ons:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.addOns.map((addon) => (
                            <Badge
                              key={addon.addOnId}
                              variant="secondary"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            >
                              {addon.name} +₹{addon.price}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="mt-3 flex items-center gap-2 w-full"
                        onClick={() => handleAddToCart(item)}
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// ----------------------------
// AddMenuItemForm component
// ----------------------------
interface AddMenuItemFormProps {
  categoryId: number;
  onSubmit: (item: any) => void;
}

const AddMenuItemForm: React.FC<AddMenuItemFormProps> = ({ categoryId, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [isVeg, setIsVeg] = useState(true);

  const handleSubmit = () => {
    if (!name) return;

    const newItem = {
      itemId: Date.now(),
      name,
      description,
      basePrice: price,
      image: image || "https://via.placeholder.com/150",
      isVeg,
      variants: [{ variantId: 1, name: "Default", price }],
      addOns: [],
    };

    onSubmit(newItem);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="input w-full"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="input w-full"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isVeg}
          onChange={(e) => setIsVeg(e.target.checked)}
        />
        <span>Is Veg</span>
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Add Item
      </Button>
    </div>
  );
};
