import { useCreateSentinelUserGroupMutation } from "../api/mutations";
import { useAppForm } from "@/components/forms";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@sharpnr/ui";
import type { CreateSentinelUserGroupRequestDto } from "../api/types";
import { createSentinelUserGroupSchema } from "../utils/schemas";

interface CreateUserGroupFormProps {
  closeModal: () => void;
}

const defValues: CreateSentinelUserGroupRequestDto = {
  description: "",
  name: "",
  parentGroupId: null,
};

function CreateUserGroupForm({ closeModal }: CreateUserGroupFormProps) {
  const { mutateAsync } = useCreateSentinelUserGroupMutation();
  const queryClient = useQueryClient();

  const form = useAppForm({
    defaultValues: defValues,
    validators: {
      onChange: createSentinelUserGroupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          ...value,
          // No parent picker yet — top-level group until one is chosen.
          parentGroupId: value.parentGroupId || null,
        });

        // Pull the freshly created group into the groups grid.
        await queryClient.invalidateQueries({
          queryKey: ["SENTINEL", "USER_GROUP"],
        });

        toast.success("User group created");
        closeModal();
      } catch (error) {
        console.error("Failed to create user group:", error);
        toast.error("Couldn't create the user group. Please try again.");
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="name"
          children={(f) => <f.TextField label="Group Name" />}
        />

        <form.AppField
          name="description"
          children={(f) => <f.TextAreaField label="Group Description" />}
        />

        <div className="flex justify-end">
          <form.AppForm>
            <form.SubmitButton>Submit</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

export default CreateUserGroupForm;
