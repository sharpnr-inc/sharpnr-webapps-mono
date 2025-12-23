import type { GetRestaurantDetails_RESPONSE } from "@/_hospitalityapp/Restaurant/apis/Restaurant";
import type { Hospitality_RestaurantGenUpdateFormData } from "@/schemas/HospitalitySchemas/Restaurant";

export const transformRestaurantGenDetailsToUpdateReqBody = (
  resData: GetRestaurantDetails_RESPONSE | undefined
): Hospitality_RestaurantGenUpdateFormData => {
  if (!resData) {
    return {
      restaurant_id: "",
      restaurant_legal_name: "",
      restaurant_display_name: "",
      fssai_number: "",
      gst_number: "",
      cin_number: "",
      address_line: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      email_address: "",
      contact_number: "",
      secondary_number: "",
      manager_name: "",
    };
  }

  return {
    restaurant_id: resData.id,
    restaurant_legal_name: resData.legal_name,
    restaurant_display_name: resData.display_name,
    fssai_number: resData.fssai_number,
    gst_number: resData.gst_number,
    cin_number: resData.cin_number,
    address_line: resData.address,
    city: resData.city,
    state: resData.state,
    country: resData.country,
    pincode: resData.pincode,
    email_address: resData.contact_email,
    contact_number: resData.contact_number,
    secondary_number: "",
    manager_name: resData.manager_name, // Fixed: was manager_number
  };
};