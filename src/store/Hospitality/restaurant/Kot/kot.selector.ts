// -----------------------------
// STATE SELECTORS
// -----------------------------
export const selectKotItems = (s: any) => s.kotItemsBasket;

// -----------------------------
// DERIVED SELECTORS
// -----------------------------
export const selectKotItemsCount = (s: any) =>
  s.kotItemsBasket.length;

// -----------------------------
// ACTION SELECTORS
// -----------------------------
export const selectAddItemInKot = (s: any) => s.addItemInKot;
export const selectRemoveItemFromKot = (s: any) =>
  s.removeItemFromKot;
export const selectClearKot = (s: any) => s.clearKot;
