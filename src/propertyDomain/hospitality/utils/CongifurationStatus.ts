export type RestaurantConfigurationStatus =
  | "CREATED"
  | "GENERAL_DETAILS_ADD"
  | "COMPLETED";

export function ProcessRestaurantConfigurationStatus(status?: string): string {
  if (!status) return "";

  switch (status) {
    case "CREATED":
      return "Restaurant created. Please complete the setup by adding or updating the general details and configuring the restaurant layout.";

    case "GENERAL_DETAILS_ADDED":
      return "General details added. Continue setup by adding tables & Floor in Layout Tab.";

    case "COMPLETED":
      return "Restaurant configuration completed.";

    default:
      return "";
  }
}
