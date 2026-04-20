import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
  // Here We have to check if user is Authenticated ? if yes then we Move further
  // If Now we Fetch the User Details
  // beforeLoad: ({context}) => {

  //   context.queryClient.ensureQueryData
  // },
  
  component: Outlet,
});
