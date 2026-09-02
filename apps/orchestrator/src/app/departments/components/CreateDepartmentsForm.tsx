import { Button, toast } from "@sharpnr/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useAppForm } from "@/components/forms";
import {
  createDepartmentRequestDtoSchema,
  type CreateDepartmentRequestDto,
} from "../api/types";
import { useCreateOrgDepartment } from "../api/mutation";

interface CreateDepartmentsFormProps {
  closeModal: () => void;
}

const defaultDepartment: CreateDepartmentRequestDto = {
  name: "",
  description: "",
  code: "",
  department_head: "",
};

/** Codes are short uppercase identifiers — drop anything else as it's typed. */
const toCode = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);

const CreateDepartmentsForm = ({ closeModal }: CreateDepartmentsFormProps) => {
  const { mutateAsync } = useCreateOrgDepartment();
  const queryClient = useQueryClient();

  const form = useAppForm({
    defaultValues: defaultDepartment,
    validators: {
      onChange: createDepartmentRequestDtoSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          name: value.name.trim(),
          description: value.description.trim(),
          // Both are optional server-side — omit rather than send an empty string.
          code: value.code?.trim() || undefined,
          department_head: value.department_head?.trim() || undefined,
        });

        // Pull the freshly created department into the departments grid.
        await queryClient.invalidateQueries({ queryKey: ["orgDepartments"] });

        toast.success("Department created");
        closeModal();
      } catch (error) {
        console.error("Failed to create department:", error);
        toast.error("Couldn't create the department. Please try again.");
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="grid gap-2 sm:grid-cols-[2fr_1fr]">
        <form.AppField
          name="name"
          children={(f) => (
            <f.TextField label="Department Name" placeholder="Engineering" />
          )}
        />

        <form.AppField
          name="code"
          children={(f) => (
            <f.TextField
              label="Code"
              placeholder="ENG"
              uppercase
              transform={toCode}
              description="Optional short identifier."
            />
          )}
        />
      </div>

      <form.AppField
        name="description"
        children={(f) => (
          <f.TextAreaField
            label="Description"
            placeholder="What this department is responsible for…"
          />
        )}
      />

      {/* Head is a free-text name for now; swap for an employee picker later. */}
      <form.AppField
        name="department_head"
        children={(f) => (
          <f.TextField
            label="Department Head"
            placeholder="Arjun Mehta"
            description="Optional — you can assign a head later."
          />
        )}
      />

      <div className="flex items-center justify-end gap-2 border-t pt-4 mt-2">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <form.AppForm>
          <form.SubmitButton>Add New Department</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
};

export default CreateDepartmentsForm;
