// import { createSignupStatusQuery } from "@/api_service/queries/SignupStatus";
import { createSignupStatusQuery } from "@/api_service/queries/SignupStatus";
import CompleteRegistration from "@/components/signup/CompleteRegistration";
import { QueryClient } from "@tanstack/react-query";
// import { QueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect,} from "@tanstack/react-router";

export const Route = createFileRoute("/signup/complete-registration")({
  // beforeLoad: async () => {
  //   // Run your signup status query
  //   const queryClient = new QueryClient();
  //   const data = await queryClient.fetchQuery(createSignupStatusQuery());

  //   switch (data?.data?.status) {
  //     case "none":
  //       throw redirect({ to: "/signup" });
  //     case "authenticated":
  //       throw redirect({ to: "/dashboard" });
  //     case "otp_verified":
  //       // User is allowed to see this page
  //       break;
  //     case "registered":
  //       // Already verified → redirect to complete registration
  //       throw redirect({
  //         to: "/signup/verify-otp",
  //         search: {
  //           email: "",
  //           VerificationKey: "",
  //         },
  //       });
  //     default:
  //       throw redirect({ to: "/signup" });
  //   }
  // },

  component: CompleteRegistration,
});
