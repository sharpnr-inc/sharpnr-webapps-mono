import api from "@/middlewares/axios";
import { SetupWizardEndpoint } from "./endpoints";

export async function fetchOrgSetupProgress() {
  const res = await api.get(SetupWizardEndpoint.setup_progress);
  return res.data;
}

export async function AddOrgHQAddress() {
  const res = await api.post(SetupWizardEndpoint.add_org_hq);
  return res.data;
}
