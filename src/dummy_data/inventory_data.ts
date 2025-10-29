//In the inventory section we need to have array of items
export interface BarInventory {
    item:BarInventoryItem[]
}


export interface BarInventoryItem {
  id: string;
  item_name: string;
  Qantity: string;
  purchase_price: number;
  quantity_left: number;
  available: string;
}


export const BarInventoryData: BarInventory = {
  item: [
    {
      id: "1",
      item_name: "Whiskey",
      Qantity: "10 bottles",
      purchase_price: 1500,
      quantity_left: 8,
      available: "Yes",
    },
    {
      id: "2",
      item_name: "Vodka",
      Qantity: "5 bottles",
      purchase_price: 1200,
      quantity_left: 3,
      available: "Yes",
    },
  ],
};