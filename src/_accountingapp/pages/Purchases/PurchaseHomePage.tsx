import { AddNewSupplierForm } from "@/_accountingapp/components/forms/AddNewSupplier";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useFormsModal } from "@/context/FormModalContext";
import { Plus } from "lucide-react";

export function PurchaseHomePage() {
  const { showModal } = useFormsModal();
  const handleCreateNewSupp = () => {
    showModal(
      "Add New Supplier",
      "Add new Supplier to your system",
      <AddNewSupplierForm />,
    );
  };

  return (
    <Card>
      <CardHeader>
        <Button onClick={() => handleCreateNewSupp()}>
          <Plus /> New Supplier{" "}
        </Button>

        <Button>
          <Plus /> New Purchase/Expense{" "}
        </Button>
        <CardTitle>Purchases</CardTitle>
      </CardHeader>
      <CardContent>Welcome to the Purchases module!</CardContent>
    </Card>
  );
}
