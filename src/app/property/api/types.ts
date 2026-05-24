export interface PropertyDomain {
  id: string;
  name: string;
  description: string;
  isAvailable: boolean;
}

export interface PropertyDomainResponse {
  domains: PropertyDomain[];
}

export interface Property {
  id: string;
  name: string;
  city: string;
  state: string;
  domain: string;
  is_configured: boolean;
  code: string;
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
  domain: string;
  __modules__data__: PropertyModule[];
  infra: PropertyInfra[];
}
