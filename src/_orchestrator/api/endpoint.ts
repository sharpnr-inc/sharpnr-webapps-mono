export const OrchestratorConsole = {
  status: "/orchestrator/console/org-status",
  property: {
    AddDomain: (propertyID: string) =>
      `/orchestrator/console/property/${propertyID}/add-domain`,

    AddModules: (propertyID: string) =>
      `/orchestrator/console/property/${propertyID}/add-modules`,

    AddInfra: (propertyID: string) =>
      `/orchestrator/console/property/${propertyID}/add-infra`,

    ConfigureHotel: (propertyID: string) =>
      `/orchestrator/console/property/${propertyID}/configure-hotel`,
  },

  legalEntity: {
    getAll: "/orchestrator/console/legal-entity",
    create: "/orchestrator/console/legal-entity/create",
  },
};
