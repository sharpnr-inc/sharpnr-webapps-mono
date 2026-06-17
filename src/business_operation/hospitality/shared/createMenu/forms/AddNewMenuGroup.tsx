import { useAppForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@sharpnr/ui";
import { useCreateMenuMutation } from "../../../infra/apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";
import type { PropertyInfra } from "@/app/property/api/types";

interface AddNewMenuGroupFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  ownersID: string;
  ownersType: string;
  kitchens: PropertyInfra[];
}

export function AddNewMenuGroupForm({
  open,
  setOpen,
  ownersID,
  ownersType,
  kitchens,
}: AddNewMenuGroupFormProps) {
  const queryClient = useQueryClient();
  const addMenu = useCreateMenuMutation();

  const form = useAppForm({
    defaultValues: {
      owner_id: ownersID,
      preferred_kitchen: "",
      menu_name: "",
      menu_description: "",
      organization_id: "",
      owner_module_type: ownersType,
    },

    onSubmit: async ({ value }) => {
      await addMenu.mutateAsync(
        {
          ownersID: ownersID,
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
          <DialogTitle>Create Menu</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="preferred_kitchen">
            {(f) => (
              <Select
                value={f.state.value}
                onValueChange={(value) => f.handleChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select preferred kitchen" />
                </SelectTrigger>

                <SelectContent>
                  {kitchens?.map((kitchen) => (
                    <SelectItem key={kitchen.id} value={kitchen.id}>
                      <div className="flex w-full items-center justify-between">
                        <span className="font-medium">{kitchen.name}</span>

                        <span
                          className={`text-xs px-2 py-0.5 rounded-md ${
                            kitchen.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {kitchen.status ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </form.AppField>

          <form.AppField name="menu_name">
            {(f) => <f.TextField label="Menu Name" />}
          </form.AppField>

          <form.AppField name="menu_description">
            {(f) => <f.TextAreaField label="A Short Description" />}
          </form.AppField>

          <DialogFooter>
            <form.AppForm>
              <form.SubmitButton>Create Menu</form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
