import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@sharpnr/ui";
import { useAllResourcesOfOrg } from "../../cedarPolicybuilder/api/query";

const CreatePolicyPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate({ to: "/authorization/policies" });
  const { data } = useAllResourcesOfOrg();
  console.log(data);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-3">
      <header className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 -ml-2 text-muted-foreground"
          onClick={goBack}
        >
          <ArrowLeft className="h-4 w-4" /> Back to policies
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Create policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Build a Cedar authorization policy. The preview is validated live
            with <code className="font-mono">@cedar-policy/cedar-wasm</code>.
          </p>
        </div>
      </header>
    </div>
  );
};

export default CreatePolicyPage;
