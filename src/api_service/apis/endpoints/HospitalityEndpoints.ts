/**
 * API endpoint paths for all Hospitality-related operations.
 *
 * The `Hospitality` object organizes routes into specific subgroups
 * for different hospitality modules such as Hotel, Room, Booking,
 * Restaurant, Kitchen, Housekeeping, Inventory, Menu, Concierge, and Settings.
 *
 * Each subgroup contains endpoint definitions for API interactions.
 * Dynamic endpoints (e.g., by ID) are defined as arrow functions for clarity.
 *
 * @constant {Object} Hospitality
 * @property {Object} Hotel - Endpoints related to hotel management.
 * @property {string} Hotel.GetAll - Fetch all hotels.
 * @property {(id: string) => string} Hotel.GetById - Fetch a specific hotel by ID.
 *
 * @property {Object} Room - Endpoints related to room management.
 * @property {(roomId: string) => string} Room.GetDetails - Fetch detailed room info.
 *
 * @property {Object} Booking - Endpoints related to room bookings.
 * @property {string} Booking.Create - Create a new room booking.
 * @property {string} Booking.GetAll - Fetch all bookings.
 *
 * @property {Object} Restaurant - Endpoints related to restaurant operations.
 * @property {string} Restaurant.CreateTableBooking - Create a new restaurant table booking.
 *
 * @property {Object} Kitchen - Endpoints related to kitchen management.
 * @property {string} Kitchen.GetOrders_Websocket_url - WebSocket URL for live kitchen orders.
 *
 * @property {Object} HouseKeeping - Endpoints related to housekeeping operations.
 * @property {string} HouseKeeping.GetRequest - Fetch all housekeeping requests.
 *
 * @property {Object} Inventory - Endpoints related to inventory management.
 * @property {string} Inventory.GetAllItem - Fetch all inventory items.
 *
 * @property {Object} Menu - Endpoints related to menu management.
 * @property {string} Menu.getAllMenuGroup - Fetch all menu groups.
 *
 * @property {Object} Concierge - Endpoints related to concierge services.
 * @property {string} Concierge.getGuestRequest - Fetch all guest requests handled by concierge.
 *
 * @property {Object} OrgConfiguration - Endpoints related to organization configuration.
 * @property {string} OrgConfiguration.GetOrganizationOverview - Fetch organizational overview.
 *
 * @property {Object} Setting - Placeholder for future settings endpoints.
 *
 * @example
 * import { Hospitality } from "@/api/routes";
 *
 * // Example: Fetch hotel details by ID
 * fetch(Hospitality.Hotel.GetById("123"))
 *   .then(res => res.json())
 *   .then(console.log);
 *
 * @exports
 */
export const HospitalityApiEndpoint = {
  Hotel: {
    GetAll: "/hospitality/hotel",
    GetById: (id: string) => `/hospitality/hotel/${id}`,
    getFrontDesk:"/sharp-hospitality/hotel/frontdesk",
    createFloor:"/sharp-hospitality/hotel/floor/create",
    updateHotelDetails: "/sharp-hospitality/hotel/configure",
    searchHotelGuests:(q:string)=>`/sharp-hospitality/hotel/guest/search?q=${encodeURIComponent(q)}`,
    createGuestForHotel:"/sharp-hospitality/hotel/guest/create",
    createBookingForRoom:"/sharp-hospitality/hotel/booking/create",
    getBookingDetails:(roomId:string) =>`/sharp-hospitality/hotel/booking/details/${roomId}`,
    createRoomInHotel:"/sharp-hospitality/hotel/room/create",

    createHotelTaxRule:"/sharp-hospitality/hotel/tax/create-rule",
    getPreviewBill:(bookingId:string)=>`/sharp-hospitality/hotel/billing/preview/${bookingId}`,
    addPaymentsInBooking:"/sharp-hospitality/hotel/payments/add"
  },

  Room: {
    GetDetails: (roomId: string) => `/hospitality/room/${roomId}/details`,
  },

  Booking: {
    Create: "/hospitality/room/booking/create",
    GetAll: "/hospitality/room/booking",
  },

  Restaurant: {
    CreateTableBooking: "/hospitality/restaurant/booking/create",
    getRestaurantDetails:"/sharp-hospitality/restaurant/getRestaurant-Gen-details",
    updateGeneralDetails:"/sharp-hospitality/restaurant/update",
    getRestaurantLayout:"/sharp-hospitality/restaurant/get-restaurant-layout",
    CreateOrAddTableInFloor:"/sharp-hospitality/restaurant/add-table",

    // Orders

    CreateTableBookingSession:"/sharp-hospitality/restaurant/session/create",
    GetTableBookingSession:(tableId:string) =>`/sharp-hospitality/restaurant/session/getbyTable/${tableId}`
  },

  Kitchen: {
    GetOrders_Websocket_url: "wss://api.example.com/hospitality/kitchen/orders",

    fetchOrders:"/sharp-hospitality/kitchen/get-orders"
  },

  HouseKeeping: {
    GetRequest: "/hospitality/housekeeping/request",
  },

  Inventory: {
    GetAllItem: "/hospitality/inventory/items",
  },

  Menu: {
    getAllMenuGroup: "/sharp-hospitality/hospitality-menu/groups",
    createCategoryInMenuGroup:"/sharp-hospitality/hospitality-menu/categories",
    GetMenuGroupDetailsById: (menuGrp:string) => `/sharp-hospitality/hospitality-menu/groups/${menuGrp}/categories`,
    CreateSubCategoryInCategory:"/sharp-hospitality/hospitality-menu/subcategories",
    CreateItemInMenu:"/sharp-hospitality/hospitality-menu/items",
    CreateVariantInMenuItem:"/sharp-hospitality/hospitality-menu/items/variants",
    CreateAddonsINMenuItem:"/sharp-hospitality/hospitality-menu/addons/add",

    // 
    GetVariantByMenuItemId :(menuItemId:string)=>`/sharp-hospitality/hospitality-menu/items/${menuItemId}/variants`,
    // UpdateVariantOfMenuItem:()
  },

  Concierge: {
    getGuestRequest: "/hospitality/concierge/requests",
  },

  OrgConfiguration: {
    GetOrganizationOverview: "/hospitality/org/config/overview",

  },

  Setting: {
    // Future: Add settings-related endpoints here
  },

  Bar:{
    getBarLayout:"sharp-hospitality/bar/get-layout",
    updateBarGenDetails:"/sharp-hospitality/bar/update",
    getBarConfigDetails:"/sharp-hospitality/bar/getBarConfigDetails"
  }
};
