import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sharpnr/ui";
import { PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppForm } from "@/components/forms";
import { useAddAddOnsOfMenuItem } from "../../../infra/apis/api.Mutations";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  ownersID: string;
  menuItemID: string;
};

export function AddAddOnFormInMenuItem({
  open,
  setOpen,
  ownersID,
  menuItemID,
}: Props) {
  const queryClient = useQueryClient();
  const addAddOns = useAddAddOnsOfMenuItem();

  const addAddonsForm = useAppForm({
    defaultValues: {
      menu_item_id: menuItemID,
      name: "",
      price: "",
    },
    onSubmit: ({ value }) => {
      const payload = { ...value, price: Number(value.price) };

      addAddOns.mutateAsync(
        { ownersID, payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Menu", ownersID] });
            setOpen(false);
          },
        },
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create AddOn</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addAddonsForm.handleSubmit();
          }}
        >
          <addAddonsForm.AppField
            name="name"
            children={(f) => <f.TextField label="AddOn Name" />}
          />

          <addAddonsForm.AppField
            name="price"
            children={(f) => <f.TextField label="AddOn Price" />}
          />

          <DialogFooter>
            <addAddonsForm.AppForm>
              <addAddonsForm.SubmitButton>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add AddOn
              </addAddonsForm.SubmitButton>
            </addAddonsForm.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
