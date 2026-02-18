// this function resolve the or Fetch what will be finally be shown to the sharpnr launcher
// function takes the response from the backend and compare it to the all the Option that user will gonna see
// this will be call by sharpnr launcher

import { useMemo } from "react";
import { APP_MODULES } from "./LaunchOptionsResgistry";

// // Mock API Call - Replace with your actual TanStack Query or fetch logic
// const fetchUserModules = async (): Promise<string[]> => {
//   // Simulating API delay
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   // Return list of IDs the user has access to
//   return ["hotel", "bar", "kitchen", "hr", "orchestrator"];
// };

export function useLauncherResolver(
  userPermissions: string[] | undefined,
  isLoading: boolean,
) {
  const resolvedModules = useMemo(() => {
    if (!userPermissions) return [];

    return APP_MODULES.map((section) => ({
      ...section,
      // Filter items within each section based on the API response
      items: section.items.filter((item) => userPermissions.includes(item.id)),
    })).filter((section) => section.items.length > 0); // Hide empty sections
  }, [userPermissions]);

  return {
    modules: resolvedModules,
    isLoading,
  };
}
