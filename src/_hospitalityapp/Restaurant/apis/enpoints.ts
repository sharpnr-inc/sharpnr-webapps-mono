export const RestaurantEndpoints = {
  Layout: (restaurantID?: string | null) =>
    `/sharp-hospitality/restaurant/${restaurantID}/layout`,
  Context: `/orchestrator/hospitality/all-restaurants`,

  GeneralInfo: (restaurantID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/general-details`,

  UpdateGeneralInfo: (restaurantID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/update-general-details`,

  /* --------------------------------- DineIN --------------------------------- */

  StartDineSession: (restaurantID: string, tableID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/${tableID}/dineIn-session`,

  GetDiningSessionOrders: (restaurantID: string, diningSessionID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/dining-session/${diningSessionID}/orders`,

  AddOrderInDiningSession: (restaurantID: string, diningSessionID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/dining-session/${diningSessionID}/add-order`,
};
