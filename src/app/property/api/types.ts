export interface Property {
  id: string;
  name: string;
  city: string;
  state: string;
  code: string;
  address_line: string;
  country: string;
}

export interface PropertiesOfOrganizationData {
  properties: Property[];
}

/* ---------------------------------- <***> --------------------------------- */

export interface PropertyDetailsData {
  name: string;
  code: string;
  city: string;
  address_line: string;
  state: string;
  country: string;
}

/* ---------------------------------- <***> --------------------------------- */
