import { useAppForm } from "@/components/forms";
import type { NewInventoryAccountPayload } from "../api/api.service";
import { useCreateNewInventoryAccountMutation } from "../api/mutations";

export function AddNewInventoryAccountForm() {
  const { mutateAsync } = useCreateNewInventoryAccountMutation();

  const defaultAccount: NewInventoryAccountPayload = {
    is_shared: false,
    name: "",
    type: "",
  };

  const form = useAppForm({
    defaultValues: defaultAccount,
    onSubmit: async ({ value }) => {
      await mutateAsync(value, {
        onSuccess: () => {},
      });
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="name"
          children={(f) => {
            return <f.TextField label="Inventory Account" />;
          }}
        />

        <form.AppField
          name="type"
          children={(f) => {
            return <f.TextField label="Inventory Type" />;
          }}
        />

        <form.AppField
          name="is_shared"
          children={(f) => {
            return (
              <f.CheckboxField
                label="Inventory Account"
                checkedLabel="When check this Inventory Account Can be Shared Accross the organization"
                description="Is This Account Sharable"
                uncheckedLabel=""
              />
            );
          }}
        />

        <form.AppForm>
          <form.SubmitButton>Add New Account</form.SubmitButton>
        </form.AppForm>
      </form>
    </div>
  );
}
