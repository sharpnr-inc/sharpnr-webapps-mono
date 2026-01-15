import api from "@/middlewares/axios";
import { HRModuleEndpoint } from "./endpoints";

export async function AddEmployeeInOrg(req: any) {
  const res = await api.post(HRModuleEndpoint.Employee.AddEmployee, req);
  return res.data;
}
