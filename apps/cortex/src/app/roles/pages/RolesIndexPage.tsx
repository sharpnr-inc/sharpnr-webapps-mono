import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { ShieldCheck } from "lucide-react";

function RolesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ShieldCheck}
      title="Roles"
      description="Permissions are granted to roles, not to people one at a time. A role defined here holds across every Sharpnr app."
      capabilities={[
        "Role definitions with scoped resource permissions",
        "Built-in and custom roles",
        "Role inheritance and composition",
        "Preview of who holds a role before changing it",
        "Consistent enforcement across every Sharpnr app",
      ]}
    />
  );
}

export default RolesIndexPage;
