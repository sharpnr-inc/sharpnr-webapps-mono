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

export interface PropertyModule {
  id: string;
  name: string;
  status: boolean;
  module_type: string;
  is_configured: boolean;
}

export interface PropertyInfra {
  id: string;
  name: string;
  status: boolean;
  infra_type: string;
}

export interface PropertyDetailsData {
  name: string;
  code: string;
  city: string;
  address_line: string;
  state: string;
  country: string;
  __modules__data__: PropertyModule[];
  infra: PropertyInfra[];
}
