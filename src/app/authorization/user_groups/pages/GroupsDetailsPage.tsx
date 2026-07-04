import { Route } from "@/routes/_appuser/authorization/user_groups/$groupID";

const GroupsDetailsPage = () => {
  const { groupID } = Route.useParams();

  return (
    <div>
      <div>
        <p>{groupID}</p>
      </div>
    </div>
  );
};

export default GroupsDetailsPage;
