// context/employee-policy-context.tsx

import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  employee_policy,
} from "@/dummy_data/employee_policy";

interface EmployeePolicyContextType {
  policy: any;
//   hasModuleAccess: (module: string) => boolean;
//   hasResourceAccess: (module: string, resource: string) => boolean;
//   hasAction: (module: string, resource: string, action: Action) => boolean;
//   getAccessLevel: (module: string) => AccessLevel;
}

const EmployeePolicyContext = createContext<
  EmployeePolicyContextType | undefined
>(undefined);

export function EmployeePolicyProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => {
    // const hasModuleAccess = (module: string): boolean => {
    //   const modulePolicy = employee_policy.Privilages[module];
    //   if (!modulePolicy) return false;

    //   return (
    //     modulePolicy.Access === "FULL" || modulePolicy.Access === "PARTIAL"
    //   );
    // };

    // const hasResourceAccess = (module: string, resource: string): boolean => {
    //   const modulePolicy = employee_policy.Privilages[module];
    //   if (!modulePolicy) return false;

    //   // FULL access = access to everything
    //   if (modulePolicy.Access === "FULL") return true;

    //   // NONE access = no access
    //   if (modulePolicy.Access === "NONE") return false;

    //   // PARTIAL access = check specific resource
    //   const resourcePermissions = modulePolicy[resource];
    //   if (!resourcePermissions) return false;

    //   // If it's an array and not ["NONE"], has access
    //   return true;
    // };

    // const hasAction = (
    //   module: string,
    //   resource: string,
    //   action: Action
    // ): boolean => {
    //   const modulePolicy = employee_policy.Privilages[module];
    //   if (!modulePolicy) return false;

    //   // FULL access = all actions allowed
    //   if (modulePolicy.Access === "FULL") return true;

    //   // NONE access = no actions allowed
    //   if (modulePolicy.Access === "NONE") return false;

    //   // PARTIAL access = check specific action
    //   const resourcePermissions = modulePolicy[resource];
    //   if (!Array.isArray(resourcePermissions)) return false;

    //   return resourcePermissions.includes(action);
    // };

    // const getAccessLevel = (module: string): AccessLevel => {
    //   return employee_policy.Privilages[module]?.Access || "NONE";
    // };

    return {
      policy: employee_policy,
    //   hasModuleAccess,
    //   hasResourceAccess,
    //   hasAction,
    //   getAccessLevel,
    };
  }, []);

  return (
    <EmployeePolicyContext.Provider value={value}>
      {children}
    </EmployeePolicyContext.Provider>
  );
}

export function useEmployeePolicy() {
  const context = useContext(EmployeePolicyContext);
  if (!context) {
    throw new Error(
      "useEmployeePolicy must be used within EmployeePolicyProvider"
    );
  }
  return context;
}
