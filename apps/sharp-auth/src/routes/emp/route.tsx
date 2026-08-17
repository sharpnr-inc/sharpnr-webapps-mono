// this page or route before loading it will take the params
// which is token, employee-email, employee-name, employee-lastname
// and send it to verification,
// after verification is done we will redirect the user to provision page
// Note:- Browser should not remember the token or anythin in parmas

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/emp")({
  component: Outlet,
});
