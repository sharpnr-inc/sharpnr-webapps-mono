import { Route } from "@/routes/setup_wizard/$stepID/userinfo";

export function UserinfoPage() {
  const { stepID } = Route.useParams();

  return <div>{stepID}</div>;
}
