import api from "@/middlewares/axios";

export const SupplierOrchestratorEndpoints = {
  GetAllSupplier: () => `/orchestrator/suppliers/list`,
  CreateNewSupplier: () => `/orchestrator/suppliers/add-new`,
};

export async function GetAllOrganizationSuppliers() {
  const res = await api.get(SupplierOrchestratorEndpoints.GetAllSupplier());
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export interface NewSupplierPayloadInterface {
  suppliers_name: string;
  email: string;
  phone: string;

  address_line: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}
export async function AddNewSupplier(payload: NewSupplierPayloadInterface) {
  const res = await api.post(
    SupplierOrchestratorEndpoints.CreateNewSupplier(),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
