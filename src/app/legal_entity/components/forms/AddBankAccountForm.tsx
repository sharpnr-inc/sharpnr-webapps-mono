import { useAppForm } from "@/components/forms";
import {
  addBankAccountInLegalEntityRequestSchema,
  type AddBankAccountInLegalEntityRequestDto,
} from "../../utils/schemas";
import { useUtilsLegalEntityBankAccountTypes } from "../../api/queries";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { useAddNewBankAccountMutaion } from "../../api/mutation";

interface AddBankAccountFormProps {
  CloseModal: () => void;
  legalEntityID: string;
}

export function AddBankAccountForm({
  CloseModal,
  legalEntityID,
}: AddBankAccountFormProps) {
  const { data: bankaccTypes } = useUtilsLegalEntityBankAccountTypes();
  const { mutateAsync } = useAddNewBankAccountMutaion();
  const defaultBankAccount: AddBankAccountInLegalEntityRequestDto = {
    account_holder_name: "",
    account_number: "",
    account_type: "",
    ifsc: "",
    is_primary: false,
    bank_name: "",
    branch_name: "",
    micr_code: "",
  };

  const form = useAppForm({
    defaultValues: defaultBankAccount,
    validators: {
      onChange: addBankAccountInLegalEntityRequestSchema,
      onBlur: addBankAccountInLegalEntityRequestSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          legalEntityID: legalEntityID,
          payload: value,
        });
        CloseModal();
      } catch (error) {
        console.error("Failed to add bank account:", error);
      }
    },
  });

  // onSuccss we Close modal

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Row 1: Account holder + number */}
        <div className="grid grid-cols-2 gap-4">
          <form.AppField
            name="account_holder_name"
            children={(f) => <f.TextField label="Account Holder Name" />}
          />
          <form.AppField
            name="account_number"
            children={(f) => <f.TextField label="Account Number" />}
          />
        </div>

        {/* Row 2: Bank name + branch name */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <form.AppField
            name="bank_name"
            children={(f) => <f.TextField label="Bank Name" />}
          />
          <form.AppField
            name="branch_name"
            children={(f) => <f.TextField label="Branch Name" />}
          />
        </div>

        {/* Row 3: IFSC + MICR */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <form.AppField
            name="ifsc"
            children={(f) => <f.TextField label="IFSC Code" />}
          />
          <form.AppField
            name="micr_code"
            children={(f) => <f.TextField label="MICR Code" />}
          />
        </div>

        {/* Row 4: Account type select — use form.Field, not form.AppField */}
        <div className="mt-4">
          <form.Field
            name="account_type"
            children={(f) => (
              <div>
                <Label htmlFor="account-type">Account Type</Label>
                <Select
                  value={f.state.value}
                  onValueChange={(val) =>
                    f.handleChange(
                      val as AddBankAccountInLegalEntityRequestDto["account_type"],
                    )
                  }
                  onOpenChange={(open) => {
                    if (!open) f.handleBlur();
                  }}
                >
                  <SelectTrigger id="account-type" className="w-full mt-1">
                    <SelectValue placeholder="Select an account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Account Types</SelectLabel>
                      {bankaccTypes?.map((bankaccType) => (
                        <SelectItem key={bankaccType.id} value={bankaccType.id}>
                          {bankaccType.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {f.state.meta.errors.map((e, i) => (
                  <p key={i} className="text-sm text-destructive mt-1">
                    {typeof e === "string" ? e : e?.message}
                  </p>
                ))}
              </div>
            )}
          />
        </div>

        {/* Row 5: Primary checkbox */}
        <div className="mt-4">
          <form.AppField
            name="is_primary"
            children={(f) => (
              <f.CheckboxField
                label="Is this the Primary Bank Account?"
                checkedLabel="This is the Legal Entity's primary bank account"
                uncheckedLabel="This is not the primary bank account"
                description="The primary bank account will appear on bills and documents."
              />
            )}
          />
        </div>

        {/* Submit */}
        <div className="mt-6">
          <form.AppForm>
            <form.SubmitButton>Add Bank Account</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}
