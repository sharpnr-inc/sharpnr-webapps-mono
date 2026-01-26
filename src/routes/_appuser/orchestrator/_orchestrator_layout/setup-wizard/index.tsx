import { setupProgressQuery } from "@/_orchestrator/SetupWizard/api/queries";
import { resolveSetupWizardRoute, } from "@/lib/setup_route_resolver";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/setup-wizard/",
)({
  beforeLoad: async ({ context }) => {
    // const progress = await context.queryClient.fetchQuery(setupProgressQuery)
    // console.log(progress)

    //  const { routeSegment, stepId } = resolveSetupWizardRoute(progress.data)
    //  console.log(routeSegment, stepId)

    // throw redirect({
    //   to: "/orchestrator/setup-wizard/step/$stepId/$stepRoute",
    //    params: {
    //   stepId,
    //   stepRoute: routeSegment,
    // },
    // });

    redirect({
      to:"/orchestrator/setup-wizard/step/$stepId/organization",
      params:{
        stepId:"sdijgvisj"
      }
    })
  },
});

//*This page will call the API and for the Steps
// *and each step page will invalidate the API call cache as soon as user did minimum task in that
// *we drive user to Next step process
