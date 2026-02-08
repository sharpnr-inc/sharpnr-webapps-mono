import { createId } from "@/utilities/id";

export const DietaryType = {
  VEG: "VEG",
  NON_VEG: "NON_VEG",
  VEGAN: "VEGAN",
  EGG: "EGG",
} as const;

export type DietaryType = (typeof DietaryType)[keyof typeof DietaryType];

export interface Menu {
  id: string;
  name: string;
  description: string;
  menuCategory: MenuCategory[];
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  menuSubCategory: MenuSubCategory[];
}

interface MenuSubCategory {
  id: string;
  name: string;
  description: string;
  menu_item: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  base_price: string;
  menuItemVariants: VariantGroup;
  addOns: MenuAddOn[];
  dietaryType: DietaryType;
}

interface VariantGroup {
  variants: Variant[];
}

interface Variant {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface MenuAddOn {
  id: string;
  name: string;
  price: string;
}

export const dummyMenuData: Menu = {
  id: createId(),
  name: "Grand Lakeside Multi-Cuisine Menu",
  description: "Full property dining experience menu.",
  menuCategory: [
    {
      id: createId(),
      name: "Starters",
      description: "Appetizers to begin your experience.",
      menuSubCategory: [
        {
          id: createId(),
          name: "Veg Starters",
          description: "",
          menu_item: [
            {
              id: createId(),
              name: "Paneer Tikka",
              description: "Char grilled cottage cheese cubes",
              base_price: "12.00",
              dietaryType: DietaryType.VEG,
              menuItemVariants: {
                variants: [
                  { id: createId(), name: "Half", description: "", price: "0" },
                  { id: createId(), name: "Full", description: "", price: "6" },
                ],
              },
              addOns: [
                { id: createId(), name: "Extra Mint Chutney", price: "1" },
              ],
            },
            {
              id: createId(),
              name: "Hara Bhara Kebab",
              description: "Spinach and peas patties",
              base_price: "10.00",
              dietaryType: DietaryType.VEG,
              menuItemVariants: { variants: [] },
              addOns: [],
            },
          ],
        },
        {
          id: createId(),
          name: "Non Veg Starters",
          description: "",
          menu_item: [
            {
              id: createId(),
              name: "Chicken Malai Tikka",
              description: "Creamy boneless chicken",
              base_price: "14.00",
              dietaryType: DietaryType.NON_VEG,
              menuItemVariants: { variants: [] },
              addOns: [
                { id: createId(), name: "Extra Dip", price: "2" },
              ],
            },
          ],
        },
      ],
    },

    {
      id: createId(),
      name: "Main Course",
      description: "Chef’s Signature Dishes",
      menuSubCategory: [
        {
          id: createId(),
          name: "Indian Breads",
          description: "",
          menu_item: [
            {
              id: createId(),
              name: "Butter Naan",
              description: "",
              base_price: "3.00",
              dietaryType: DietaryType.VEG,
              menuItemVariants: {
                variants: [
                  { id: createId(), name: "Plain", description: "", price: "0" },
                  { id: createId(), name: "Butter Loaded", description: "", price: "1" },
                ],
              },
              addOns: [],
            },
          ],
        },
        {
          id: createId(),
          name: "Curries",
          description: "",
          menu_item: [
            {
              id: createId(),
              name: "Dal Makhani",
              description: "Slow cooked black lentils",
              base_price: "11.00",
              dietaryType: DietaryType.VEG,
              menuItemVariants: {
                variants: [
                  { id: createId(), name: "Regular", description: "", price: "0" },
                  { id: createId(), name: "Large Bowl", description: "", price: "4" },
                ],
              },
              addOns: [
                { id: createId(), name: "Extra Butter", price: "1.5" },
              ],
            },
            {
              id: createId(),
              name: "Chicken Butter Masala",
              description: "Classic creamy tomato gravy",
              base_price: "16.00",
              dietaryType: DietaryType.NON_VEG,
              menuItemVariants: { variants: [] },
              addOns: [],
            },
          ],
        },
      ],
    },

    {
      id: createId(),
      name: "Breakfast",
      description: "Morning Specials",
      menuSubCategory: [
        {
          id: createId(),
          name: "Egg Specials",
          description: "",
          menu_item: [
            {
              id: createId(),
              name: "Cheese Omelette",
              description: "",
              base_price: "7.00",
              dietaryType: DietaryType.EGG,
              menuItemVariants: {
                variants: [
                  { id: createId(), name: "2 Egg", description: "", price: "0" },
                  { id: createId(), name: "3 Egg", description: "", price: "2" },
                ],
              },
              addOns: [
                { id: createId(), name: "Extra Cheese", price: "1.5" },
              ],
            },
          ],
        },
      ],
    },

    {
      id: createId(),
      name: "Desserts",
      description: "Sweet Endings",
      menuSubCategory: [
        {
          id: createId(),
          name: "Indian Sweets",
          description: "",
          menu_item: [
            {
              id: createId(),
              name: "Gulab Jamun",
              description: "",
              base_price: "5.00",
              dietaryType: DietaryType.VEG,
              menuItemVariants: { variants: [] },
              addOns: [
                { id: createId(), name: "Vanilla Ice Cream", price: "2" },
              ],
            },
          ],
        },
      ],
    },

    {
      id: createId(),
      name: "Beverages",
      description: "Hot & Cold Drinks",
      menuSubCategory: [
        {
          id: createId(),
          name: "Healthy",
          description: "",
          menu_item: [
            {
              id: createId(),
              name: "Fresh Orange Juice",
              description: "",
              base_price: "4.00",
              dietaryType: DietaryType.VEGAN,
              menuItemVariants: {
                variants: [
                  { id: createId(), name: "Regular", description: "", price: "0" },
                  { id: createId(), name: "Large", description: "", price: "2" },
                ],
              },
              addOns: [],
            },
          ],
        },
      ],
    },
  ],
};
