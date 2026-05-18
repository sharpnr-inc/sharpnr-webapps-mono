import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@sharpnr/ui";

import { Button } from "@sharpnr/ui";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganizationLegalEntities } from "@/app/legal_entity/api/legalEntity.api.queries";
import { useAppForm } from "@/components/forms";
import { useCreatePaymentAccountMutation } from "../api/api.mutation";

interface CreatePaymentAccountFormProps {
  openDialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
}

export interface CreatePaymentAccountRequest {
  legal_entity_id: string;
  account_ref: string;
  currency_code?: string;
}

export const CreatePaymentAccountForm = ({
  openDialog,
  setDialog,
}: CreatePaymentAccountFormProps) => {
  const { data: legalEntities, isLoading } = useOrganizationLegalEntities();

  const { mutateAsync } = useCreatePaymentAccountMutation();

  const defaultAccount: CreatePaymentAccountRequest = {
    account_ref: "",
    legal_entity_id: "",
    currency_code: "",
  };

  const form = useAppForm({
    defaultValues: defaultAccount,
    onSubmit: async ({ value }) => {
      await mutateAsync(
        { payload: value },
        {
          onSuccess: () => {
            setDialog(false);
          },
        },
      );
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setDialog}>
      <DialogContent className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Payment Account</DialogTitle>
          </DialogHeader>

          <form.AppField
            name="legal_entity_id"
            children={(f) => {
              return (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Legal Entity</label>

                  <Select
                    value={f.state.value}
                    onValueChange={(v) => f.handleChange(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select legal entity" />
                    </SelectTrigger>

                    <SelectContent>
                      {isLoading && (
                        <SelectItem value="loading" disabled>
                          Loading legal entities...
                        </SelectItem>
                      )}

                      {!isLoading &&
                        legalEntities?.data?.map((entity: any) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.name}
                          </SelectItem>
                        ))}

                      {!isLoading && legalEntities?.data?.length === 0 && (
                        <SelectItem value="empty" disabled>
                          No legal entities found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />

          <form.AppField
            name="account_ref"
            children={(f) => {
              return <f.TextField label="Account Ref/ Account Name" />;
            }}
          />

          <form.AppField
            name="currency_code"
            children={(f) => {
              return (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>

                  <Select
                    value={f.state.value}
                    onValueChange={(v) => f.handleChange(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />

          <DialogFooter className="">
            <Button variant="destructive" onClick={() => setDialog(false)}>
              Cancel
            </Button>

            <form.AppForm>
              <form.SubmitButton>Create Payment Account</form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
