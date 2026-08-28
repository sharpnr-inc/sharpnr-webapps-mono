import { ArrowLeft, ShieldUser, Sparkles } from "lucide-react";
import { Button, Separator, toast } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-form";
import { RoleCard } from "../components/RoleCard";
import { slugify } from "../store/useAddRoleStore";
import type { CreateNewSentinelRoleRequestDto, OrgRole } from "../api/types";
import { useCreateSentinelRoleMutation } from "../api/mutations";
import { createNewSentinelRoleSchema } from "../utils/schemas";
import { useAppForm } from "@/components/forms";

const AddRolePage = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateSentinelRoleMutation();

  const defValue: CreateNewSentinelRoleRequestDto = {
    description: "",
    name: "",
  };

  const form = useAppForm({
    defaultValues: defValue,
    validators: {
      onChange: createNewSentinelRoleSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          name: value.name.trim(),
          description: value.description.trim(),
        });

        // Pull the new role into the roles list before we land back on it.
        await queryClient.invalidateQueries({ queryKey: ["OrgRoles"] });

        toast.success("Role created");
        nav({ to: "/authorization/roles" });
      } catch (error) {
        console.error("Failed to create role:", error);
        toast.error("Couldn't create the role. Please try again.");
      }
    },
  });

  // Live preview role fed straight from the form's current values.
  const values = useStore(form.store, (state) => state.values);
  const previewRole: OrgRole = {
    id: "preview",
    slug: slugify(values.name) || "new-role",
    name: values.name.trim() || "New role",
    description:
      values.description.trim() ||
      "Describe what this role is for so teammates know when to use it.",
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      {/* Back navigation */}
      <button
        type="button"
        onClick={() => nav({ to: "/authorization/roles" })}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to roles
      </button>

      {/* Header */}
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <ShieldUser className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">
            Create a role
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Give the role a name, describe what it's for, and pick the policies it
          should start with.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* ---- Left: live preview ---- */}
        <div className="space-y-3 md:sticky md:top-6 md:self-start">
          <RoleCard role={previewRole} memberCount={0} hideAction />
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Live preview — updates as you type
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* ---- Right: form ---- */}
          <div className="space-y-6 rounded-2xl border p-5">
            {/* Name */}

            <form.AppField
              name="name"
              children={(f) => <f.TextField label="Role Name" />}
            />

            <form.AppField
              name="description"
              children={(f) => <f.TextAreaField label="Role Description" />}
            />

            <Separator />

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => nav({ to: "/authorization/roles" })}
              >
                Cancel
              </Button>
              <form.AppForm>
                <form.SubmitButton>Submit</form.SubmitButton>
              </form.AppForm>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRolePage;
