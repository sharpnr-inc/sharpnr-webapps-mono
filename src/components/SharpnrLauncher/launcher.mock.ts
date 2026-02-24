import type { LauncherPayload } from "./launcher.types";

export async function fetchLauncherConfig(): Promise<LauncherPayload> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Domains: [
          //   {
          //     Hospitality: {
          //       Modules: ["HOTEL", "BAR", "RESTAURANT", "NIGHT_CLUB"],
          //       Infras: ["KITCHEN"],
          //     },
          //   },
          // Example second domain
          // {
          //   Medical: {
          //     Modules: ["OPD"],
          //     Infras: []
          //   }
          // }
        ],
      });
    }, 1200);
  });
}
