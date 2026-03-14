import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppForm } from "@/components/forms";
import { useAddVariantGroupMutation } from "../../apis/api.Mutations";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  ownersID: string;
  menuItemID: string;
};

export function AddVariantGroupForm({
  open,
  setOpen,
  ownersID,
  menuItemID,
}: Props) {
  const queryClient = useQueryClient();
  const addVariantGroup = useAddVariantGroupMutation();

  const form = useAppForm({
    defaultValues: {
      menu_item_id: menuItemID,
      variant_group_name: "",
    },
    onSubmit: ({ value }) => {
      addVariantGroup.mutateAsync(
        { ownersID, request_payload: value },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Menu", ownersID] });
            form.reset();
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
          <DialogTitle>Create Variant Group</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField
            name="variant_group_name"
            children={(f) => <f.TextField label="Variant Group Name" />}
          />

          <DialogFooter>
            <form.AppForm>
              <form.SubmitButton>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Group
              </form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
