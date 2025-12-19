export interface CreateHotelGuestsRequest {
  name: string;
  mobile: string;
  email?: string;
  dob?: string;
  aadhaarId?: string;
  address?: string;
}