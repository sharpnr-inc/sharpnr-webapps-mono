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
import { useAddVariantsInVariantGroup } from "../../apis/api.Mutations";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  ownersID: string;
  menuItemID: string;
  variantGroupID: string;
};

export function AddVariantForm({
  open,
  setOpen,
  ownersID,
  menuItemID,
  variantGroupID,
}: Props) {
  const queryClient = useQueryClient();
  const addVariants = useAddVariantsInVariantGroup();

  const addVariantsForm = useAppForm({
    defaultValues: {
      variant_group_id: variantGroupID,
      menu_item_id: menuItemID,
      name: "",
      price: "",
    },
    onSubmit: ({ value }) => {
      const payload = {
        ...value,
        price: Number(value.price),
      };

      addVariants.mutateAsync(
        { ownersID, request_payload: payload },
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
          <DialogTitle>Create Variant</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addVariantsForm.handleSubmit();
          }}
        >
          <addVariantsForm.AppField
            name="name"
            children={(f) => <f.TextField label="Variant Name" />}
          />

          <addVariantsForm.AppField
            name="price"
            children={(f) => <f.TextField label="Variant Price" />}
          />

          <DialogFooter>
            <addVariantsForm.AppForm>
              <addVariantsForm.SubmitButton>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Variant
              </addVariantsForm.SubmitButton>
            </addVariantsForm.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
