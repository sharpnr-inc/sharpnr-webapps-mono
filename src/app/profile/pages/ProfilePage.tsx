import { useProfileDetails } from "../api/queries";

const ProfilePage = () => {
  const { data } = useProfileDetails();
  return <div>ProfilePage</div>;
};

export default ProfilePage;
