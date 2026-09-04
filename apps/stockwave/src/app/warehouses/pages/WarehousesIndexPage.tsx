import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Warehouse } from "lucide-react";

function WarehousesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Warehouse}
      title="Warehouses"
      description="The physical places stock lives, down to the bin — so 'in stock' always answers the question 'where?'"
      capabilities={[
        "Warehouse, zone and bin structure",
        "Per-location stock and capacity",
        "Default picking and putaway locations",
        "Location-level permissions and ownership",
        "Multi-site consolidated and per-site views",
      ]}
    />
  );
}

export default WarehousesIndexPage;
