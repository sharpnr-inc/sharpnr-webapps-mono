import { useAppForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAddCategoryInMenuMutation } from "../../../infra/apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";

interface AddMenuCategoryFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  ownersID: string;
  menuID: string;
}

export function AddMenuCategoryForm({
  open,
  setOpen,
  ownersID,
  menuID,
}: AddMenuCategoryFormProps) {
  const queryClient = useQueryClient();
  const createCategory = useAddCategoryInMenuMutation();

  const form = useAppForm({
    defaultValues: {
      menu_id: menuID,
      category_name: "",
      category_description: "",
    },

    onSubmit: async ({ value }) => {
      await createCategory.mutateAsync(
        {
          OwnersID: ownersID,
          request_payload: value,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ["Menu", ownersID],
            });

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
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="category_name">
            {(f) => <f.TextField label="Category Name" />}
          </form.AppField>

          <form.AppField name="category_description">
            {(f) => <f.TextAreaField label="Category Description" />}
          </form.AppField>

          <DialogFooter>
            <form.AppForm>
              <form.SubmitButton>Add Category</form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
