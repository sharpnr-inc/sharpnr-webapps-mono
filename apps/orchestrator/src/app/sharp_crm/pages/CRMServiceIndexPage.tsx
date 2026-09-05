import { useSharpCrmAccountStatus } from "../api/queries";

function CRMServiceIndexPage() {
  const { data } = useSharpCrmAccountStatus();
  return <div></div>;
}

export default CRMServiceIndexPage;
