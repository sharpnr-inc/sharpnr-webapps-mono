import type { Menu } from "@/_orchestrator/hospitality_configs/hotel/forms/CreateMenuForm";
import { createId } from "@/utilities/id";

export const dummyMenuData: Menu = {
  id: createId(),
  name: "Lakeside Veranda Dinner",
  description: "Evening fine dining experience overlooking the property gardens.",
  menuCategory: [
    {
      id: createId(),
      name: "Main Course",
      description: "Signature entrees prepared by our executive chef.",
      menuSubCategory: [
        {
          id: createId(),
          name: "Gourmet Pizzas",
          description: "Wood-fired artisanal pizzas using local ingredients.",
          menu_item: [
            {
              id: createId(),
              name: "Truffle Mushroom Pizza",
              description: "Wild forest mushrooms, mozzarella, and white truffle oil drizzle.",
              base_price: "24.00",
              menuItemVariants: {
                variants: [
                  {
                    id: createId(),
                    name: "Personal 10\"",
                    description: "Serves one person",
                    price: "0.00", // No additional cost to base
                  },
                  {
                    id: createId(),
                    name: "Large 14\"",
                    description: "Family size",
                    price: "12.00", // Add 12 to base
                  }
                ]
              },
              addOns: [
                {
                  id: createId(),
                  name: "Extra Truffle Oil",
                  price: "3.50"
                },
                {
                  id: createId(),
                  name: "Gluten-Free Crust",
                  price: "5.00"
                }
              ]
            }
          ]
        },
        {
          id: createId(),
          name: "Grill & Steaks",
          description: "Premium cuts of meat aged for 21 days.",
          menu_item: [
            {
              id: createId(),
              name: "Prime Ribeye",
              description: "300g grass-fed ribeye served with roasted garlic.",
              base_price: "45.00",
              menuItemVariants: {
                variants: [
                  {
                    id: createId(),
                    name: "Medium Rare",
                    description: "Warm red center",
                    price: "0.00"
                  },
                  {
                    id: createId(),
                    name: "Well Done",
                    description: "Cooked through",
                    price: "0.00"
                  }
                ]
              },
              addOns: [
                {
                  id: createId(),
                  name: "Peppercorn Sauce",
                  price: "2.00"
                },
                {
                  id: createId(),
                  name: "Grilled Prawn Skewer",
                  price: "12.00"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: createId(),
      name: "Beverages",
      description: "Refreshing cocktails and house-made infusions.",
      menuSubCategory: [
        {
          id: createId(),
          name: "Signature Cocktails",
          description: "Curated mixology inspired by the property heritage.",
          menu_item: [
            {
              id: createId(),
              name: "Garden Gin Fizz",
              description: "Local gin, elderflower, cucumber, and soda water.",
              base_price: "14.00",
              menuItemVariants: {
                variants: [
                  {
                    id: createId(),
                    name: "Standard",
                    description: "Single shot",
                    price: "0.00"
                  },
                  {
                    id: createId(),
                    name: "Double Up",
                    description: "Double shot of premium gin",
                    price: "6.00"
                  }
                ]
              },
              addOns: []
            }
          ]
        }
      ]
    }
  ]
};