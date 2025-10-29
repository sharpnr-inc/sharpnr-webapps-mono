export interface BarMenu {
  items: BarMenuItem[];
}

export interface BarMenuItemTag {
  id: string;
  name: string;
}

export interface BarMenuItemSize {
  id: string;
  name: string;
  quantity: number;
}

export interface BarMenuItemAddon {
  id: string;
  name: string;
  price: number;
}

export interface BarMenuItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  sizes?: BarMenuItemSize[];
  tags?: BarMenuItemTag[];
  addons?: BarMenuItemAddon[];
  description?: string;
  imageUrl?: string;
  price?: number;
}

export const barMenu: BarMenu = {
  items: [
    {
      id: "drink-001",
      name: "Mojito",
      category: "Cocktail",
      quantity: 50,
      price: 350,
      sizes: [
        { id: "size-1", name: "Small", quantity: 250 },
        { id: "size-2", name: "Large", quantity: 400 },
      ],
      tags: [
        { id: "tag-1", name: "Refreshing" },
        { id: "tag-2", name: "Mint" },
      ],
      addons: [
        { id: "addon-1", name: "Extra Lime", price: 30 },
        { id: "addon-2", name: "Extra Rum Shot", price: 120 },
      ],
      description: "Classic Cuban cocktail with mint, lime, and soda.",
      imageUrl:
        "https://example.com/images/mojito.jpg",
    },
    {
      id: "drink-002",
      name: "Pina Colada",
      category: "Cocktail",
      quantity: 30,
      price: 400,
      sizes: [
        { id: "size-3", name: "Regular", quantity: 300 },
        { id: "size-4", name: "Large", quantity: 450 },
      ],
      tags: [
        { id: "tag-3", name: "Sweet" },
        { id: "tag-4", name: "Tropical" },
      ],
      addons: [
        { id: "addon-3", name: "Extra Pineapple", price: 40 },
        { id: "addon-4", name: "Coconut Cream Shot", price: 70 },
      ],
      description: "Creamy pineapple and coconut cocktail served chilled.",
      imageUrl:
        "https://example.com/images/pina-colada.jpg",
    },
    {
      id: "drink-003",
      name: "Virgin Mojito",
      category: "Mocktail",
      quantity: 40,
      price: 250,
      sizes: [
        { id: "size-5", name: "Regular", quantity: 300 },
        { id: "size-6", name: "Large", quantity: 500 },
      ],
      tags: [
        { id: "tag-5", name: "Non-Alcoholic" },
        { id: "tag-6", name: "Refreshing" },
      ],
      addons: [{ id: "addon-5", name: "Extra Mint Leaves", price: 20 }],
      description: "Alcohol-free version of the classic Mojito.",
      imageUrl:
        "https://example.com/images/virgin-mojito.jpg",
    },
    {
      id: "drink-004",
      name: "Heineken",
      category: "Beer",
      quantity: 100,
      price: 280,
      sizes: [
        { id: "size-7", name: "Pint", quantity: 330 },
        { id: "size-8", name: "Bottle", quantity: 650 },
      ],
      tags: [{ id: "tag-7", name: "Imported" }],
      addons: [
        { id: "addon-6", name: "Frosted Mug", price: 40 },
        { id: "addon-7", name: "Lemon Slice", price: 10 },
      ],
      description: "Premium Dutch lager beer with a balanced flavor.",
      imageUrl:
        "https://example.com/images/heineken.jpg",
    },
    {
      id: "drink-005",
      name: "Jack Daniel’s",
      category: "Whiskey",
      quantity: 25,
      price: 700,
      sizes: [
        { id: "size-9", name: "30ml", quantity: 30 },
        { id: "size-10", name: "60ml", quantity: 60 },
      ],
      tags: [
        { id: "tag-8", name: "Classic" },
        { id: "tag-9", name: "Strong" },
      ],
      addons: [
        { id: "addon-8", name: "Coke Mixer", price: 60 },
        { id: "addon-9", name: "Ice Cube Set", price: 20 },
      ],
      description: "Tennessee whiskey known for its smooth, smoky taste.",
      imageUrl:
        "https://example.com/images/jack-daniels.jpg",
    },
  ],
};


export const categories = [
  {
    id: "cat-1",
    name: "Whiskey",
    subCategories: [
      { id: "sub-1-1", name: "Single Malt" },
      { id: "sub-1-2", name: "Blended" },
      { id: "sub-1-3", name: "Bourbon" },
      { id: "sub-1-4", name: "Scotch" },
    ],
  },
  {
    id: "cat-2",
    name: "Vodka",
    subCategories: [
      { id: "sub-2-1", name: "Plain Vodka" },
      { id: "sub-2-2", name: "Flavored Vodka" },
      { id: "sub-2-3", name: "Premium Vodka" },
    ],
  },
  {
    id: "cat-3",
    name: "Rum",
    subCategories: [
      { id: "sub-3-1", name: "White Rum" },
      { id: "sub-3-2", name: "Dark Rum" },
      { id: "sub-3-3", name: "Spiced Rum" },
      { id: "sub-3-4", name: "Gold Rum" },
    ],
  },
  {
    id: "cat-4",
    name: "Gin",
    subCategories: [
      { id: "sub-4-1", name: "London Dry" },
      { id: "sub-4-2", name: "Old Tom" },
      { id: "sub-4-3", name: "Plymouth" },
      { id: "sub-4-4", name: "Flavored Gin" },
    ],
  },
  {
    id: "cat-5",
    name: "Beer",
    subCategories: [
      { id: "sub-5-1", name: "Lager" },
      { id: "sub-5-2", name: "Ale" },
      { id: "sub-5-3", name: "Stout" },
      { id: "sub-5-4", name: "Wheat Beer" },
      { id: "sub-5-5", name: "Craft Beer" },
    ],
  },
  {
    id: "cat-6",
    name: "Wine",
    subCategories: [
      { id: "sub-6-1", name: "Red Wine" },
      { id: "sub-6-2", name: "White Wine" },
      { id: "sub-6-3", name: "Rosé Wine" },
      { id: "sub-6-4", name: "Sparkling Wine" },
    ],
  },
  {
    id: "cat-7",
    name: "Cocktails",
    subCategories: [
      { id: "sub-7-1", name: "Classic Cocktails" },
      { id: "sub-7-2", name: "Signature Cocktails" },
      { id: "sub-7-3", name: "Frozen Cocktails" },
    ],
  },
  {
    id: "cat-8",
    name: "Mocktails",
    subCategories: [
      { id: "sub-8-1", name: "Fruit-Based" },
      { id: "sub-8-2", name: "Creamy" },
      { id: "sub-8-3", name: "Sparkling" },
    ],
  },
  {
    id: "cat-9",
    name: "Shots",
    subCategories: [
      { id: "sub-9-1", name: "Classic Shots" },
      { id: "sub-9-2", name: "Layered Shots" },
      { id: "sub-9-3", name: "Flavored Shots" },
    ],
  },
  {
    id: "cat-10",
    name: "Soft Drinks",
    subCategories: [
      { id: "sub-10-1", name: "Soda" },
      { id: "sub-10-2", name: "Juices" },
      { id: "sub-10-3", name: "Energy Drinks" },
      { id: "sub-10-4", name: "Water" },
    ],
  },
];

