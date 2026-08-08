export const HotelEndpoints = {
  getAllOrganizationHotel: () => `/sharp-hospitality/orchestration/hotels`,
  getHotelLayout: (hotelID: string) =>
    `/sharp-hospitality/hotel/${hotelID}/layout`,
};
