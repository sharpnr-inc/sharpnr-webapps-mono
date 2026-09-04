import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { RotateCcw } from "lucide-react";

function ReturnsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={RotateCcw}
      title="Returns"
      description="Stock coming back — inspected before it re-enters saleable inventory, because a return is not automatically good stock."
      capabilities={[
        "Customer returns with reason codes",
        "Inspection and grading before restocking",
        "Restock, repair, or scrap disposition",
        "Supplier returns for faulty received goods",
        "Credit note handoff to Sharp-Accounting",
      ]}
    />
  );
}

export default ReturnsIndexPage;
