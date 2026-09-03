import { useAppForm } from "@/components/forms";
import { Button, toast, useModal } from "@sharpnr/ui";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldPlus, AlertTriangle } from "lucide-react";
import {
  addNewSuperAdminInOrganizationRequestSchema,
  type AddNewSuperAdminInOrganizationRequestDto,
} from "../api/types";
import { useAddNewSuperAdminMutation } from "../api/mutation";

/* ── Modal form ────────────────────────────────────────────── */

const defaultSuperAdmin: AddNewSuperAdminInOrganizationRequestDto = {
  email: "",
  firstName: "",
  password: "",
  lastName: "",
};

function AddSuperAdminForm({ closeModal }: { closeModal: () => void }) {
  const { mutateAsync } = useAddNewSuperAdminMutation();
  const queryClient = useQueryClient();

  const form = useAppForm({
    defaultValues: defaultSuperAdmin,
    validators: {
      onChange: addNewSuperAdminInOrganizationRequestSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await mutateAsync({
          firstName: value.firstName.trim(),
          // Optional server-side — omit rather than send an empty string.
          lastName: value.lastName?.trim() || undefined,
          email: value.email.trim(),
          password: value.password,
        });

        if (!response.success) {
          toast.error(
            response.message ??
              "Couldn't add the Super Admin. Please try again.",
          );
          return;
        }

        // Pull the new Super Admin into the employee directory.
        await queryClient.invalidateQueries({
          queryKey: ["all_org_employees"],
        });

        toast.success("Super Admin added");
        closeModal();
      } catch (error) {
        console.error("Failed to add the super admin:", error);
        toast.error("Couldn't add the Super Admin. Please try again.");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      {/* Warning notice */}
      <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Super Admins have full, unrestricted access to the organization —
          including billing, members, and security settings. Only grant this to
          people you fully trust.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <form.AppField
          name="firstName"
          children={(f) => (
            <f.TextField label="First Name" placeholder="Jordan" />
          )}
        />

        <form.AppField
          name="lastName"
          children={(f) => (
            <f.TextField
              label="Last Name"
              placeholder="Rivera"
              description="Optional."
            />
          )}
        />
      </div>

      <form.AppField
        name="email"
        children={(f) => (
          <f.TextField
            label="Email Address"
            type="email"
            placeholder="name@company.com"
          />
        )}
      />

      <form.AppField
        name="password"
        children={(f) => (
          <f.TextField
            label="Temporary Password"
            type="password"
            placeholder="••••••••"
            description="Share this with them securely — they should change it after signing in."
          />
        )}
      />

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <form.AppForm>
          <form.SubmitButton>Add Super Admin</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}

/* ── Trigger button ────────────────────────────────────────── */

export function AddSuperAdminButton() {
  const { openModal, closeModal } = useModal();

  const handleClick = () => {
    openModal({
      title: "Add Super Admin",
      description:
        "Grant a person full administrative control over this organization.",
      size: "sm",
      content: <AddSuperAdminForm closeModal={closeModal} />,
    });
  };

  return (
    <Button size="sm" onClick={handleClick} className="shrink-0">
      <ShieldPlus className="h-4 w-4" />
      <span className="hidden sm:inline">Add Super Admin</span>
      <span className="sm:hidden">Add</span>
    </Button>
  );
}
