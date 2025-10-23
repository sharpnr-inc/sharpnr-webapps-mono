export type AccessLevel = "FULL" | "PARTIAL" | "NONE";
export type Action = "READ" | "WRITE" | "EDIT" | "DELETE";
export interface ModuleAccess {
  Access: AccessLevel;
  [resource: string]: AccessLevel | Action[];
}

export interface EmployeePrivileges {
  [module: string]: ModuleAccess;
}

export interface EmployeePolicy {
  EmployeeID: string;
  Privilages: EmployeePrivileges;
}

export const employee_policy: EmployeePolicy = {
  EmployeeID: "nvwohnwieh-wnseinn-2387273-cub",
  Privilages: {
    SharpAccounting: {
      Access: "PARTIAL",
      transactions: ["READ"],
      invoice: ["READ", "WRITE", "DELETE"],
    },
    SharpHR: {
      Access: "NONE",
    },
    SharpHotel: {
      Access: "FULL",
    },
  },
};
