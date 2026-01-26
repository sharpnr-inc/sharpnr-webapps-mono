export const OrchestratorConsole = {
  status: "/orchestrator/console/org-status",

  property: {
    getAll: "/orchestrator/console/property",
    PropertyDetails: (propID: string) =>
      `/orchestrator/console/property/${propID}`,
  },
};
