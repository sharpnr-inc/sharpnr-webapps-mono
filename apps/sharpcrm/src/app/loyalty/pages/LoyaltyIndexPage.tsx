import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Star } from "lucide-react";

function LoyaltyIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Star}
      title="Loyalty & Rewards"
      description="Programs that reward repeat business — shared with the operation apps, so a hotel or restaurant runs its program through the same rules."
      capabilities={[
        "Points and tier-based programs",
        "Reward catalogue and redemption tracking",
        "Referral programs with attribution",
        "Program rules configurable per business unit",
        "Member standing surfaced on the customer record",
      ]}
    />
  );
}

export default LoyaltyIndexPage;
