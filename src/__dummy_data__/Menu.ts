export const DUMMY_MENU_DATA = [
  {
    ID: "group-1", // MenuGroup
    Name: "Main Restaurant",
    OwnerModule: "RESTAURANT",
    Categories: [
      {
        ID: "cat-1",
        Name: "Starters",
        SubCategories: [
          {
            ID: "sub-1",
            Name: "Soups",
            Items: [
              {
                ID: "item-101",
                Name: "Tomato Basil Soup",
                BasePrice: 8.50,
                IsVeg: true,
                TaxCategoryCode: "FOOD_ST",
                VariantGroups: [
                  {
                    ID: "vg-1",
                    Name: "Portion Size",
                    IsMultiSelect: false,
                    Variants: [
                      { ID: "v-1", Name: "Half", Price: 0 },
                      { ID: "v-2", Name: "Full", Price: 4.00 }
                    ]
                  }
                ],
                Addons: [
                  { ID: "ad-1", Name: "Extra Croutons", Price: 1.50 },
                  { ID: "ad-2", Name: "Parmesan Cheese", Price: 2.00 }
                ]
              },
              {
                ID: "item-102",
                Name: "Chicken Corn Soup",
                BasePrice: 9.00,
                IsVeg: false,
                TaxCategoryCode: "FOOD_ST",
                VariantGroups: [],
                Addons: []
              }
            ]
          },
          {
            ID: "sub-2",
            Name: "Salads",
            Items: [
              {
                ID: "item-103",
                Name: "Caesar Salad",
                BasePrice: 12.00,
                IsVeg: true,
                TaxCategoryCode: "FOOD_ST",
                VariantGroups: [
                  {
                    ID: "vg-2",
                    Name: "Add Protein",
                    IsMultiSelect: true,
                    Variants: [
                      { ID: "v-3", Name: "Grilled Chicken", Price: 5.00 },
                      { ID: "v-4", Name: "Shrimp", Price: 7.00 }
                    ]
                  }
                ],
                Addons: []
              }
            ]
          }
        ]
      },
      {
        ID: "cat-2",
        Name: "Main Course",
        SubCategories: [
          {
            ID: "sub-3",
            Name: "Burgers",
            Items: [
              {
                ID: "item-201",
                Name: "Signature Beef Burger",
                BasePrice: 15.00,
                IsVeg: false,
                TaxCategoryCode: "FOOD_MAIN",
                VariantGroups: [
                  {
                    ID: "vg-3",
                    Name: "Doneness",
                    IsMultiSelect: false,
                    Variants: [
                      { ID: "v-5", Name: "Medium Rare", Price: 0 },
                      { ID: "v-6", Name: "Medium Well", Price: 0 }
                    ]
                  }
                ],
                Addons: [
                  { ID: "ad-3", Name: "Bacon Strip", Price: 2.50 },
                  { ID: "ad-4", Name: "Avocado", Price: 2.00 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    ID: "group-2",
    Name: "The Bar",
    OwnerModule: "BAR",
    Categories: [
      {
        ID: "cat-3",
        Name: "Beverages",
        SubCategories: [
          {
            ID: "sub-4",
            Name: "Cocktails",
            Items: [
              {
                ID: "item-301",
                Name: "Classic Mojito",
                BasePrice: 10.00,
                IsVeg: true,
                TaxCategoryCode: "ALCOHOL",
                VariantGroups: [
                  {
                    ID: "vg-4",
                    Name: "Spirit Preference",
                    IsMultiSelect: false,
                    Variants: [
                      { ID: "v-7", Name: "Standard Rum", Price: 0 },
                      { ID: "v-8", Name: "Premium Aged Rum", Price: 4.50 }
                    ]
                  }
                ],
                Addons: [
                  { ID: "ad-5", Name: "Extra Mint", Price: 0.50 }
                ]
              }
            ]
          },
          {
            ID: "sub-5",
            Name: "Soft Drinks",
            Items: [
              {
                ID: "item-302",
                Name: "Fresh Lime Soda",
                BasePrice: 4.50,
                IsVeg: true,
                TaxCategoryCode: "BEV_NON",
                VariantGroups: [
                  {
                    ID: "vg-5",
                    Name: "Sweetness",
                    IsMultiSelect: false,
                    Variants: [
                      { ID: "v-9", Name: "Salted", Price: 0 },
                      { ID: "v-10", Name: "Sweet", Price: 0 },
                      { ID: "v-11", Name: "Mixed", Price: 0 }
                    ]
                  }
                ],
                Addons: []
              }
            ]
          }
        ]
      }
    ]
  }
];