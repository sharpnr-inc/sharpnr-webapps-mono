import { useState } from "react";
import { Button, Input, Label, Switch } from "@sharpnr/ui";
import { Building2 } from "lucide-react";

interface CreateDepartmentsFormProps {
  closeModal: () => void;
}

const CreateDepartmentsForm = ({ closeModal }: CreateDepartmentsFormProps) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [head, setHead] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    name.trim().length > 1 &&
    code.trim().length > 0 &&
    head.trim().length > 1 &&
    emailValid &&
    location.trim().length > 0 &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // TODO: wire to real mutation, e.g. createDepartmentMutation({ name, code, head, email, location, active })
      await new Promise((resolve) => setTimeout(resolve, 600));
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dep-name">Department name</Label>
        <Input
          id="dep-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Engineering"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dep-code">Department code</Label>
        <Input
          id="dep-code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. ENG"
          maxLength={8}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dep-head">Department head</Label>
        <Input
          id="dep-head"
          value={head}
          onChange={(e) => setHead(e.target.value)}
          placeholder="e.g. Arjun Mehta"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dep-email">Email address</Label>
        <Input
          id="dep-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="engineering@company.com"
        />
        {email.length > 0 && !emailValid && (
          <span className="text-xs text-destructive">
            Enter a valid email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dep-location">Location</Label>
        <Input
          id="dep-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Bengaluru HQ"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
        <div>
          <p className="text-sm font-medium text-foreground">
            Active department
          </p>
          <p className="text-xs text-muted-foreground">
            Inactive departments are hidden from most views.
          </p>
        </div>
        <Switch checked={active} onCheckedChange={setActive} />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          <Building2 className="h-4 w-4" />
          {submitting ? "Creating…" : "Create Department"}
        </Button>
      </div>
    </form>
  );
};

export default CreateDepartmentsForm;
