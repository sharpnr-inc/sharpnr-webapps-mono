import api from "@/middlewares/axios";
import { SetupWizardEndpoint } from "./endpoints";

export async function fetchOrgSetupProgress() {
  const res = await api.get(SetupWizardEndpoint.setup_progress);
  return res.data;
}

// Step 1 for setup-wiz version 1
export async function AddOrgHQAddress(payload:any) {
  const res = await api.post(SetupWizardEndpoint.step_one_AddOrgHQ, payload);
  return res.data;
}

// Step 2 for setup-wiz version 1
export async function AddProperty(payload:any) {
  const res = await api.post(SetupWizardEndpoint.step_two_AddProperty, payload);
  return res.data;
}


