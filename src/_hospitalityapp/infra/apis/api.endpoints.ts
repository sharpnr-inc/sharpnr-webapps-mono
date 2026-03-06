export const MenuModuleEndpoints = {
  GetMenu: (ownersID: string) => `/sharp-hospitality/${ownersID}/menu`,

  AddMenu: (ownersID: string) => `/sharp-hospitality/${ownersID}/menu/add`,

  AddCategory: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/addCategory`,
  AddSubCategory: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/addSubCategory`,
  AddMenuItem: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/add-menu-item`,
  AddVariantGroup: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/add-variant-group`,
  AddVariant: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/add-variant`,
  AddAddon: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/add-addOns`,

  // Menu Preferred Kitchen Register

  AddPreferredKitchenToMenuGroup: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/configs/register/menugroup-kitchen`,

  AddPreferredKitchenToMenuCategory: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/configs/register/category-kitchen`,

  AddPreferredKitchenToMenuSubCategory: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/configs/register/sub-category-kitchen`,

  AddPreferredKitchenToMenuItem: (ownersID: string) =>
    `/sharp-hospitality/${ownersID}/menu/configs/register/menu-item-kitchen`,
};
