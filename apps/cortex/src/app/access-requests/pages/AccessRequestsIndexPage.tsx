import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { UserCheck } from "lucide-react";

function AccessRequestsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={UserCheck}
      title="Access Requests"
      description="Sensitive access is asked for, not assumed. Requests queue here for sign-off before anything is granted."
      capabilities={[
        "Request queue with justification and requested scope",
        "Approval workflows with named approvers",
        "Time-bound and just-in-time access grants",
        "Automatic revocation when a grant expires",
        "Full request-to-grant trail in the audit log",
      ]}
    />
  );
}

export default AccessRequestsIndexPage;
