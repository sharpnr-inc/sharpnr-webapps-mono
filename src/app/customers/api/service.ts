import api from "@/middlewares/axios";

export const OrgCoreEndpoints = {
  Customer: {
    CreateCustomer: () => `orchestrator/org/customers/add`,
    Search: (searchQuery: string) =>
      `orchestrator/org/customers/search?searchQuery=${searchQuery}`,
  },
};

export async function GetOrgCustomer(searchQuery: string) {
  const res = await api.get(OrgCoreEndpoints.Customer.Search(searchQuery));
  return res.data;
}

export async function AddCustomerInOrg() {
  const res = await api.post(OrgCoreEndpoints.Customer.CreateCustomer());
  return res.data;
}
