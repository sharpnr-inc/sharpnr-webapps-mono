import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";

const ManageRole = () => {
  const nav = useNavigate();
  const { roleID } = useParams({
    from: "/_appuser/authorization/roles/$roleID/",
  });

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

      <h1 className="text-lg font-semibold text-foreground">{roleID}</h1>
    </div>
  );
};

export default ManageRole;
