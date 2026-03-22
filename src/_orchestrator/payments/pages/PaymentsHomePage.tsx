import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreatePaymentAccountForm } from "../components/CreatePaymentAccountForm";

export function PaymentsHomePage() {
  const [creatAccountOpen, setCreateAccountOpen] = useState(false);
  

  return (
    <div className="mt-4 space-y-2">
      <div className="w-full space-y-2 border flex place-items-end">
        <Button onClick={() => setCreateAccountOpen(true)}>
          <Plus />
          Add Payment Account
        </Button>
      </div>

      <div>
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Account Name</CardTitle>
            <CardDescription>
              This is going to be Card Description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>HI this is going to Payment Account</div>
          </CardContent>
          <CardFooter>is this Card Active</CardFooter>
        </Card>
      </div>

      <CreatePaymentAccountForm
        openDialog={creatAccountOpen}
        setDialog={setCreateAccountOpen}
      />
    </div>
  );
}
