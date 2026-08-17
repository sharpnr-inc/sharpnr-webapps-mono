import { api } from "@sharpnr/http";
import type { CreatePaymentAccountRequest } from "../components/CreatePaymentAccountForm";
import type { GatewayConfigFormRequest } from "../components/AddGatewayConfigForm";

export const PaymentsEndpoints = {
  CreateAccount: () => `/orchestrator/payments/create`,
  GetPaymentAccounts: () => `/orchestrator/payments`,

  AddGatewayConfig: () => `/orchestrator/payments/add/config`,
  GetPaymentAccountDetails: (paymentAccountID: string) =>
    `/orchestrator/payments/details/${paymentAccountID}`,
};

interface CreatePaymentAccountPayload {
  payload: CreatePaymentAccountRequest;
}

export async function CreatePaymentAccount({
  payload,
}: CreatePaymentAccountPayload) {
  const res = await api.post(PaymentsEndpoints.CreateAccount(), payload);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetPaymentAccounts() {
  const res = await api.get(PaymentsEndpoints.GetPaymentAccounts());
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
interface GatewayConfigPayload {
  payload: GatewayConfigFormRequest;
}
export async function AddGatawayConfigInPaymentAccount({
  payload,
}: GatewayConfigPayload) {
  const res = await api.post(PaymentsEndpoints.AddGatewayConfig(), payload);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetPaymentAccountConfigs(paymentAccountID: string) {
  const res = await api.get(
    PaymentsEndpoints.GetPaymentAccountDetails(paymentAccountID),
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
