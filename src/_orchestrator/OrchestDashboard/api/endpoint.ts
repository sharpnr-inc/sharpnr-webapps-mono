export const OrchestratorConsole = {
  status: "/orchestrator/console/org-status",

  property: {
    getAll: "/orchestrator/console/property",
    PropertyDetails: (propID: string) =>
      `/orchestrator/console/property/${propID}`,

    AddDomain: (propertyID: string) =>
      `/orchestrator/console/property/${propertyID}/add-domain`,

    AddModules: (propertyID: string) =>
      `/orchestrator/console/property/${propertyID}/add-modules`,
    ConfigureRestaurant: (propertyID: string) =>
      `/orchestrator/console/property/${propertyID}/configure-restaurant`,
  },
};
