import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_appuser/deparments/$departmentID/index";
import { Badge, Button, Separator, Skeleton } from "@sharpnr/ui";
import { formatDateTimePretty } from "@sharpnr/utils";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Calendar,
  CalendarClock,
  Hash,
  UploadCloud,
  UserRound,
} from "lucide-react";
import { useOrgDepartmentById } from "../api/queries";

/* ─────────────────────────────────────────────
   Detail row
───────────────────────────────────────────── */

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3">
      <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </span>
      <span className="text-sm text-foreground text-right">{children}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

const OrgDeparmentsDetailsPage = () => {
  const { departmentID } = Route.useParams();
  const { data, isLoading, isError } = useOrgDepartmentById(departmentID);
  const nav = useNavigate();

  const department = data?.data;

  const handleAddBulkEmployees = () => {
    nav({ to: "/org-users/add_employees" });
  };

  const backToDepartments = (
    <button
      type="button"
      onClick={() => nav({ to: "/deparments" })}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
    >
      <ArrowLeft className="size-3.5" />
      Back to Departments
    </button>
  );

  if (isLoading) {
    return (
      <div className="cf-font relative z-10 flex flex-col p-6 md:p-10 gap-6">
        {backToDepartments}
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-52 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !department) {
    return (
      <div className="cf-font relative z-10 flex flex-col p-6 md:p-10 gap-6">
        {backToDepartments}
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <AlertTriangle className="size-6 text-destructive/60" />
          <p className="font-display italic text-xl text-foreground">
            Couldn't load this department
          </p>
          <p className="text-xs text-muted-foreground">
            It may have been removed, or the request failed. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cf-font relative z-10 flex flex-col p-6 md:p-10 gap-6">
      {backToDepartments}

      {/* header */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col rounded-2xl border border-border/60 bg-background/60"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 p-5">
          <div className="flex items-start gap-4 min-w-0">
            <div className="size-14 rounded-2xl bg-linear-to-br from-primary/25 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Building2 className="size-6 text-primary" />
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display italic text-4xl md:text-5xl text-foreground leading-none">
                  {department.name}
                </h1>
                {department.code && (
                  <Badge variant="secondary" className="cf-mono tracking-widest">
                    {department.code}
                  </Badge>
                )}
              </div>

              <p className="max-w-2xl text-sm text-muted-foreground">
                {department.description || "No description added yet."}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={handleAddBulkEmployees}
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Add Bulk Employees
          </Button>
        </div>

        <Separator />

        <div className="grid divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
          <div className="divide-y">
            <DetailRow icon={Hash} label="Department ID">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                {department.id}
              </code>
            </DetailRow>
            <DetailRow icon={UserRound} label="Department Head">
              {department.department_head || "—"}
            </DetailRow>
          </div>

          <div className="divide-y">
            <DetailRow icon={Calendar} label="Created">
              {formatDateTimePretty(department.created_at) || "—"}
            </DetailRow>
            <DetailRow icon={CalendarClock} label="Last updated">
              {formatDateTimePretty(department.updated_at) || "—"}
            </DetailRow>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default OrgDeparmentsDetailsPage;
