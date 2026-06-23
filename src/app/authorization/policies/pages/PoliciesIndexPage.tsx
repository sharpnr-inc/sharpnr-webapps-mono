import { ShieldCheck, Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@sharpnr/ui";
import { PoliciesList } from "../components/PoliciesList";
import { dummyPolicies } from "../data/dummyPolicies";

const PoliciesIndexPage = () => {
  const navigate = useNavigate();

  // TODO: swap dummy data for the real backend response once `usePermissions()`
  // returns Cedar policies from `/orchestrator/sentinel/policies`.
  const policies = dummyPolicies;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Policies</h1>
            <span className="text-sm text-muted-foreground">
              ({policies.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Cedar authorization policies evaluated by Sentinel. Showing dummy
            data until the backend is connected.
          </p>
        </div>

        <Button
          className="gap-1"
          onClick={() => navigate({ to: "/authorization/policies/create" })}
        >
          <Plus className="h-4 w-4" /> Add Policy
        </Button>
      </header>

      <PoliciesList policies={policies} />
    </div>
  );
};

export default PoliciesIndexPage;
