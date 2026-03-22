import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Leaf, MoveLeft, MoveRight, Plus } from "lucide-react";
import { useState } from "react";
import { CreatePaymentAccountForm } from "../components/CreatePaymentAccountForm";
import { usePaymentAccounts } from "../api/api.queries";
import { useNavigate } from "@tanstack/react-router";

export function PaymentsHomePage() {
  const [creatAccountOpen, setCreateAccountOpen] = useState(false);

  const { data, isLoading, isError } = usePaymentAccounts();
  const navigate = useNavigate();

  const accounts = data?.data ?? [];

  return (
    <div className="mt-4 space-y-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Payment Accounts</div>

        <Button onClick={() => setCreateAccountOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Account
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-muted-foreground text-sm">
          Loading payment accounts...
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-red-500 text-sm">
          Failed to fetch payment accounts
        </div>
      )}

      {/* Empty State */}
      {!isLoading && accounts.length === 0 && (
        <div className="text-muted-foreground text-sm border rounded-lg p-6 text-center">
          No payment accounts found.
          <br />
          Click <span className="font-medium">Add Payment Account</span> to
          create one.
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account: any) => (
          <Card
            key={account.LegalEntityID}
            className="hover:shadow-md transition"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">{account.Name}</CardTitle>

                <Badge variant={account.IsActive ? "default" : "secondary"}>
                  {account.IsActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <CardDescription>Currency: {account.Currency}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="text-xs text-muted-foreground">
                Legal Entity ID
              </div>

              <div className="text-sm font-mono break-all">
                {account.LegalEntityID}
              </div>
            </CardContent>

            <CardFooter className="text-xs text-muted-foreground">
              <Button
                variant={"secondary"}
                onClick={() =>
                  navigate({
                    to: "/orchestrator/payments/$accountId",
                    params: {
                      accountId: account.Id,
                    },
                  })
                }
              >
                See Details <MoveRight />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <CreatePaymentAccountForm
        openDialog={creatAccountOpen}
        setDialog={setCreateAccountOpen}
      />
    </div>
  );
}
