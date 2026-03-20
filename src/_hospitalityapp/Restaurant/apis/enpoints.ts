export const RestaurantEndpoints = {
  Layout: (restaurantID?: string | null) =>
    `/sharp-hospitality/restaurant/${restaurantID}/layout`,

  ActivateOrDeactivaeRestaurant: (restaurantID: string, resSwitch: boolean) =>
    `/sharp-hospitality/restaurant/${restaurantID}/configs/activate-deactivate/${resSwitch}`,

  AddPreferredKitchen: (restaurantID: string, kitchenID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/configs/add-preferred-kitchen/${kitchenID}`,

  AddLayout: (restaurantID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/configs/add-layout`,

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

  CloseDiningSession: (restaurantID: string, diningSessionID: string) =>
    `/sharp-hospitality/restaurant/${restaurantID}/dining-session/${diningSessionID}/close-session`,
};
