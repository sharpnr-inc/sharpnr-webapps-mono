import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Users } from "lucide-react";

function UsersIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Users}
      title="Users"
      description="The people in your organization and what each of them can reach. Cortex governs their access; SharpIAM is where they use it."
      capabilities={[
        "Directory of users with their effective access",
        "Role assignment and group membership",
        "Access review — what a user can reach, and why",
        "Suspend, restore and offboard with access revocation",
        "Device and session ownership per user",
      ]}
    />
  );
}

export default UsersIndexPage;
