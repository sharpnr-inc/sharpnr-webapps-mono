export type Hospitality_BarGeneralDetailsUpdateReq= {
  bar_id?: string 
  name?: string 
  display_name?: string 
  legal_name?: string 
  registered_address?: string 

  opening_time?: string 
  closing_time?: string 

  is_share_legal_details_with_main_org?: boolean 
  gst_number?: string 
  cin_number?: string 
  fssai_number?: string 

  is_multifloor?: boolean 
  address_line?: string 
  city?: string 
  state?: string 
  country?: string 
  pincode?: string 
}
