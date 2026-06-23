import { usePermissions } from "../api/queries";

const PoliciesIndexPage = () => {
  const { data } = usePermissions();

  console.log(data);
  return <div>PoliciesIndexPage</div>;
};

export default PoliciesIndexPage;
