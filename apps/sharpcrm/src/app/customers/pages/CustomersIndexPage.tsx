import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { HeartHandshake } from "lucide-react";

function CustomersIndexPage() {
  return (
    <FeaturePlaceholder
      icon={HeartHandshake}
      title="Customers"
      description="Accounts that have actually transacted. Distinct from Contacts on purpose: this is the post-sale relationship, not the address book."
      capabilities={[
        "Purchase and order history",
        "Lifetime value, renewal dates and churn risk",
        "Billing relationship shared with Sharp-Accounting",
        "Loyalty tier and rewards standing",
        "Support, feedback and satisfaction history",
      ]}
    />
  );
}

export default CustomersIndexPage;
