import api from "@/middlewares/axios";
import type { PropertyPayload } from "../components/AddPropertyForm";
import type { APIResponse } from "@/lib/api_response";
import type {
  PropertiesOfOrganizationData,
  PropertyDetailsData,
} from "./types";

const PropertyEndpoints = {
  AddProperty: "/orchestrator/property/create",

  allProperty: "/orchestrator/property",

  PropertyDetails: (propID: string | undefined) =>
    `/orchestrator/property/${propID}`,
};

/* ---------------------------------- <***> --------------------------------- */

export async function AddProperty(payload: PropertyPayload) {
  const res = await api.post(PropertyEndpoints.AddProperty, payload);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function ListAllProperties() {
  const res = await api.get<APIResponse<PropertiesOfOrganizationData>>(
    PropertyEndpoints.allProperty,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetPropertyDetails(propertyID: string | undefined) {
  const res = await api.get<APIResponse<PropertyDetailsData>>(
    PropertyEndpoints.PropertyDetails(propertyID),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
