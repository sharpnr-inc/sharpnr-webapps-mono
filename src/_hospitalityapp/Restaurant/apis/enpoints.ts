export const RestaurantEndpoints = {
  Layout: (restaurantID?: string | null) =>
    `/sharp-hospitality/restaurant/${restaurantID}/layout`,
  Context: `/orchestrator/hospitality/all-restaurants`,

  /* --------------------------------- DineIN --------------------------------- */

  StartDineSession: (restaurantID: string, tableID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/${tableID}/dineIn-session`,

  GetDiningSessionOrders: (restaurantID: string, diningSessionID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/dining-session/${diningSessionID}/orders`,

  AddOrderInDiningSession: (restaurantID: string, diningSessionID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/dining-session/${diningSessionID}/add-order`,
};
