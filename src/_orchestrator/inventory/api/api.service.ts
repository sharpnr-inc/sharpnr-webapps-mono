import api from "@/middlewares/axios";

export const InventoryEndpoints = {
  GetAllAccounts: () => `/orchestrator/inventory-account`,
  CreateNewAccount: () => `/orchestrator/inventory-account/add`,
};

export async function GetAllInventoryAccount() {
  const res = await api.get(InventoryEndpoints.GetAllAccounts());
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

/**
 * Interface representing the payload for creating a new inventory account.
 * Matches the Go struct: NewInventoryAccountRequestDto
 */
export interface NewInventoryAccountPayload {
  name: string;
  type: string;
  is_shared: boolean;
}

/**
 * Sends a POST request to create a new inventory account.
 * @param payload - The account details (name, type, and sharing status)
 * @returns The server response data
 */
export async function CreateInventoryAccount(
  payload: NewInventoryAccountPayload,
) {
  const res = await api.post(InventoryEndpoints.CreateNewAccount(), payload);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
