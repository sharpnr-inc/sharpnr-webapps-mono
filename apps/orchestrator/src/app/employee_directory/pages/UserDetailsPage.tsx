import { Route } from "@/routes/_appuser/org-users/$employeeID/index";

const UserDetailsPage = () => {
  const { employeeID } = Route.useParams();
  return (
    <div>
      <div>{employeeID}</div>
    </div>
  );
};

export default UserDetailsPage;
