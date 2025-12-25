import type { BarGeneralDetailsResponse } from "@/_hospitalityapp/Bar/apis/Bar";
import type { Hospitality_BarGeneralDetailsUpdateReq } from "@/schemas/HospitalitySchemas/Bar";

export const transformBarGenDetailsResToBarUpdateReq = (
  response: BarGeneralDetailsResponse | undefined
): Hospitality_BarGeneralDetailsUpdateReq => {
  if (!response) {
    return {
      bar_id: "",
      name: "",
      display_name: "",
      legal_name: "",
      registered_address: "",

      opening_time: "",
      closing_time: "",
      
      gst_number: "",
      cin_number: "",
      fssai_number: "",
      address_line: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    };
  }

  return {
    bar_id: response.bar_id,
    name: response.bar_display_name,
    display_name: response.display_name,
    legal_name: response.legal_name,
    registered_address: response.address_line,

    opening_time: response.opening_time,
    closing_time: response.closing_time,
    gst_number: response.gst_number,
    cin_number: response.cin_number,
    fssai_number: response.fssai_number,
    
    address_line: response.address_line,
    city: response.city,
    state: response.state,
    country: response.country,
    pincode: response.pincode,
  };
};
