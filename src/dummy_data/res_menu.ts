export const res_menu = [
  {
    categoryId: 1,
    categoryName: "Pizzas",
    items: [
      {
        itemId: 101,
        name: "Margherita Pizza",
        description: "Classic cheese and tomato pizza with Italian herbs.",
        basePrice: 199,
        image:
          "https://images.unsplash.com/photo-1601924572878-39c1d4a9b0f9?w=600&q=80",
        variants: [
          { variantId: 1, name: "Regular", price: 199 },
          { variantId: 2, name: "Medium", price: 299 },
          { variantId: 3, name: "Large", price: 399 },
        ],
        addOns: [
          { addOnId: 1, name: "Extra Cheese", price: 40 },
          { addOnId: 2, name: "Olives", price: 30 },
          { addOnId: 3, name: "Mushrooms", price: 35 },
        ],
        isVeg: true,
      },
      {
        itemId: 102,
        name: "Pepperoni Pizza",
        description: "Loaded with mozzarella and spicy pepperoni slices.",
        basePrice: 249,
        image:
          "https://images.unsplash.com/photo-1600628422019-90c7a96d6b1d?w=600&q=80",
        variants: [
          { variantId: 1, name: "Regular", price: 249 },
          { variantId: 2, name: "Medium", price: 349 },
          { variantId: 3, name: "Large", price: 449 },
        ],
        addOns: [
          { addOnId: 1, name: "Extra Cheese", price: 40 },
          { addOnId: 2, name: "Jalapenos", price: 25 },
        ],
        isVeg: false,
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: "Burgers",
    items: [
      {
        itemId: 201,
        name: "Veggie Burger",
        description: "Grilled veggie patty with lettuce, tomato, and cheese.",
        basePrice: 149,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
        variants: [
          { variantId: 1, name: "Single Patty", price: 149 },
          { variantId: 2, name: "Double Patty", price: 199 },
        ],
        addOns: [
          { addOnId: 1, name: "Cheese Slice", price: 20 },
          { addOnId: 2, name: "Extra Mayo", price: 15 },
        ],
        isVeg: true,
      },
      {
        itemId: 202,
        name: "Chicken Zinger Burger",
        description: "Crispy chicken fillet with zesty sauce and lettuce.",
        basePrice: 179,
        image:
          "https://images.unsplash.com/photo-1591348278863-2f8e8e8f4e9c?w=600&q=80",
        variants: [
          { variantId: 1, name: "Regular", price: 179 },
          { variantId: 2, name: "Cheese Loaded", price: 219 },
        ],
        addOns: [
          { addOnId: 1, name: "Fries Combo", price: 79 },
          { addOnId: 2, name: "Extra Sauce", price: 20 },
        ],
        isVeg: false,
      },
    ],
  },
  {
    categoryId: 3,
    categoryName: "Beverages",
    items: [
      {
        itemId: 301,
        name: "Cold Coffee",
        description: "Chilled coffee with whipped cream.",
        basePrice: 99,
        image:
          "https://images.unsplash.com/photo-1570872628232-64b3ddf9c4d1?w=600&q=80",
        variants: [
          { variantId: 1, name: "Small", price: 99 },
          { variantId: 2, name: "Medium", price: 129 },
          { variantId: 3, name: "Large", price: 159 },
        ],
        addOns: [
          { addOnId: 1, name: "Whipped Cream", price: 20 },
          { addOnId: 2, name: "Chocolate Syrup", price: 25 },
        ],
        isVeg: true,
      },
      {
        itemId: 302,
        name: "Lemon Iced Tea",
        description: "Refreshing iced tea with lemon flavor.",
        basePrice: 89,
        image:
          "https://images.unsplash.com/photo-1613470207939-7b5c3d7a91cc?w=600&q=80",
        variants: [
          { variantId: 1, name: "Small", price: 89 },
          { variantId: 2, name: "Large", price: 119 },
        ],
        addOns: [
          { addOnId: 1, name: "Mint", price: 10 },
          { addOnId: 2, name: "Lemon Slice", price: 5 },
        ],
        isVeg: true,
      },
    ],
  },
  {
    categoryId: 4,
    categoryName: "Desserts",
    items: [
      {
        itemId: 401,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten lava center.",
        basePrice: 149,
        image:
          "https://images.unsplash.com/photo-1612197527762-9d52c0f2c8a0?w=600&q=80",
        variants: [
          { variantId: 1, name: "Single", price: 149 },
          { variantId: 2, name: "Double", price: 249 },
        ],
        addOns: [
          { addOnId: 1, name: "Vanilla Ice Cream Scoop", price: 40 },
          { addOnId: 2, name: "Choco Chips", price: 20 },
        ],
        isVeg: true,
      },
    ],
  },
];
