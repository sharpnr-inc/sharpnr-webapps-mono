import { ShieldUser, Users, AlertTriangle, Plus } from "lucide-react";
import { Skeleton, Button } from "@sharpnr/ui";
import { useAllOrgRoles } from "../api/queries";
import { RolesOverview } from "../components/RolesOverview";
import { RoleCard } from "../components/RoleCard";
import { useNavigate } from "@tanstack/react-router";

const RolesIndexPage = () => {
  const nav = useNavigate();
  const { data, isLoading, isError } = useAllOrgRoles();
  const roles = data?.data ?? [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldUser className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Roles</h1>
            {!isLoading && !isError && (
              <span className="text-sm text-muted-foreground">
                ({roles.length})
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            See the different jobs in your organization and what each one can
            do.
          </p>
        </div>

        <Button
          className="gap-1"
          onClick={() =>
            nav({
              to: "/authorization/roles/create",
            })
          }
        >
          <Plus className="h-4 w-4" /> Add New Role
        </Button>
      </header>

      {/* Descriptive overview */}
      <RolesOverview />

      {/* Roles list */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">
          Roles in your organization
        </h2>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-12 text-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <p className="text-sm text-muted-foreground">
              Couldn't load roles. Please try again.
            </p>
          </div>
        ) : roles.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-12 text-center">
            <Users className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No roles defined yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RolesIndexPage;
