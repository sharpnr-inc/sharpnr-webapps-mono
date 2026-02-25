import api from "@/middlewares/axios";
import { useQuery } from "@tanstack/react-query";
import type { LauncherPayload } from "./launcher.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export function useLauncher() {
  return useQuery({
    queryKey: ["launcher"],

    queryFn: async (): Promise<LauncherPayload> => {
      const res = await api.get<ApiResponse<LauncherPayload>>(
        "/orchestrator/launcher",
      );

      return res.data.data; // ✔ now valid
    },

    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
