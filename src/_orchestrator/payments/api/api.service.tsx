import api from "@/middlewares/axios";
import type { CreatePaymentAccountRequest } from "../components/CreatePaymentAccountForm";

export const PaymentsEndpoints = {
  CreateAccount: () => `/orchestrator/payments/create`,
  GetPaymentAccounts: () => `/orchestrator/payments`,
  GetPaymentAccountDetails: () => ``,
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

export async function GetPaymentAccounts() {
  const res = await api.get(PaymentsEndpoints.GetPaymentAccounts());
  return res.data;
}
