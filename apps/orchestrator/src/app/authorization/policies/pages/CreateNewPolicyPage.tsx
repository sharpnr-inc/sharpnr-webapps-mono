import { useEffect, useState } from "react";
import { ArrowLeft, ScrollText } from "lucide-react";
import { Button } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import PolicyBuilder from "@/app/authorization/cedarPolicybuilder/PolicyBuilder";
import { usePolicyBuilderStore } from "@/app/authorization/cedarPolicybuilder/store/usePolicyBuilderStore";

const CreateNewPolicyPage = () => {
  const nav = useNavigate();
  const reset = usePolicyBuilderStore((s) => s.reset);

  // Latest generated Cedar text + whether it currently parses.
  const [policy, setPolicy] = useState({ text: "", valid: false });

  // Start from a clean draft each time the page mounts.
  useEffect(() => {
    reset();
  }, [reset]);

  const handleCreate = () => {
    // TODO: wire up to the create-policy mutation.
    console.log("Create policy", policy.text);
    reset();
    nav({ to: "/authorization/policies" });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      {/* Back navigation */}
      <button
        type="button"
        onClick={() => nav({ to: "/authorization/policies" })}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to policies
      </button>

      {/* Header */}
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">
            Create a policy
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Define who can do what on which resources. The Cedar policy is
          generated and validated live as you build.
        </p>
      </header>

      <div className="rounded-2xl border p-5">
        <PolicyBuilder onChange={setPolicy} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => nav({ to: "/authorization/policies" })}
        >
          Cancel
        </Button>
        <Button disabled={!policy.valid} onClick={handleCreate}>
          Create policy
        </Button>
      </div>
    </div>
  );
};

export default CreateNewPolicyPage;
