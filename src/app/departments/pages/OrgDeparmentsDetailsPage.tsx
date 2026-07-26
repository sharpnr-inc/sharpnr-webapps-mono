import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_appuser/deparments/$departmentID/index";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@sharpnr/ui";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  FolderKanban,
  Mail,
  MapPin,
  UploadCloud,
  UserPlus,
  UserRound,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { DUMMY_DEPARTMENTS } from "../data/dummyDepartments";

/* ─────────────────────────────────────────────
   Dummy data (replace with API queries)
───────────────────────────────────────────── */

type DepartmentEmployee = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "active" | "invited";
};

const DUMMY_EMPLOYEES: DepartmentEmployee[] = [
  {
    id: "emp-001",
    name: "Kabir Anand",
    role: "Senior Engineer",
    email: "kabir.anand@sharpnr.com",
    status: "active",
  },
  {
    id: "emp-002",
    name: "Meera Nair",
    role: "Engineering Manager",
    email: "meera.nair@sharpnr.com",
    status: "active",
  },
  {
    id: "emp-003",
    name: "Sahil Kapoor",
    role: "QA Engineer",
    email: "sahil.kapoor@sharpnr.com",
    status: "active",
  },
  {
    id: "emp-004",
    name: "Riya Desai",
    role: "Product Designer",
    email: "riya.desai@sharpnr.com",
    status: "invited",
  },
];

type DepartmentProject = {
  id: string;
  name: string;
  status: "active" | "on-hold" | "completed";
  progress: number;
  deadline: string;
};

const DUMMY_PROJECTS: DepartmentProject[] = [
  {
    id: "proj-001",
    name: "Customer Portal Revamp",
    status: "active",
    progress: 68,
    deadline: "2026-09-15",
  },
  {
    id: "proj-002",
    name: "Internal Tooling Migration",
    status: "active",
    progress: 34,
    deadline: "2026-10-30",
  },
  {
    id: "proj-003",
    name: "Q2 Performance Audit",
    status: "on-hold",
    progress: 12,
    deadline: "2026-08-01",
  },
  {
    id: "proj-004",
    name: "Onboarding Flow Redesign",
    status: "completed",
    progress: 100,
    deadline: "2026-06-10",
  },
];

const PROJECT_STATUS_META: Record<
  DepartmentProject["status"],
  string
> = {
  active: "bg-primary/10 border-primary/20 text-primary",
  "on-hold": "bg-amber-500/10 border-amber-500/20 text-amber-500",
  completed: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
};

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

function initials(name: string) {
  return name
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ─────────────────────────────────────────────
   Add Employee form (dummy — replace with mutation)
───────────────────────────────────────────── */

function AddEmployeeForm({
  departmentName,
  closeModal,
}: {
  departmentName: string;
  closeModal: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    name.trim().length > 1 && emailValid && !!role && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // TODO: wire to real mutation, e.g. addDepartmentEmployeeMutation({ name, email, role, employeeCode })
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success(`${name} added to ${departmentName}`);
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="emp-name">Full name</Label>
        <Input
          id="emp-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Aditi Rao"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="emp-email">Email address</Label>
        <Input
          id="emp-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />
        {email.length > 0 && !emailValid && (
          <span className="text-xs text-destructive">
            Enter a valid email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="emp-role">Role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="emp-role" className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineer">Engineer</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Designer">Designer</SelectItem>
            <SelectItem value="Analyst">Analyst</SelectItem>
            <SelectItem value="Intern">Intern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="emp-code">Employee code (optional)</Label>
        <Input
          id="emp-code"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
          placeholder="e.g. EMP014"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          <UserPlus className="h-4 w-4" />
          {submitting ? "Adding…" : "Add Employee"}
        </Button>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

const OrgDeparmentsDetailsPage = () => {
  const { departmentID } = Route.useParams();
  const nav = useNavigate();
  const { openModal, closeModal } = useModal();

  const department =
    DUMMY_DEPARTMENTS.find((d) => d.ID === departmentID) ??
    DUMMY_DEPARTMENTS[0];

  const activeProjects = DUMMY_PROJECTS.filter(
    (p) => p.status === "active",
  ).length;

  const handleAddEmployee = () => {
    openModal({
      title: "Add Employee",
      description: `Add a single employee to ${department.name}.`,
      content: (
        <AddEmployeeForm
          departmentName={department.name}
          closeModal={closeModal}
        />
      ),
    });
  };

  const handleAddBulkEmployees = () => {
    nav({ to: "/org-users/add_employees" });
  };

  return (
    <div className="cf-font relative z-10 flex flex-col p-6 md:p-10 gap-8">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-5"
      >
        <button
          onClick={() => nav({ to: "/deparments" })}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-3.5" />
          Back to Departments
        </button>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-linear-to-br from-primary/25 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Building2 className="size-6 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display italic text-4xl md:text-5xl text-foreground leading-none">
                  {department.name}
                </h1>
                <span
                  className={`cf-mono text-[10px] px-2 py-0.5 rounded-lg border ${
                    department.status === "active"
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-muted/30 border-border/40 text-muted-foreground/40"
                  }`}
                >
                  {department.status}
                </span>
              </div>
              <p className="cf-mono text-[11px] text-muted-foreground tracking-widest uppercase">
                {department.code}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleAddBulkEmployees}>
              <UploadCloud className="h-3.5 w-3.5" />
              Add Bulk Employees
            </Button>
            <Button size="sm" onClick={handleAddEmployee}>
              <UserPlus className="h-3.5 w-3.5" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* meta row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <UserRound className="size-3.5" />
            {department.head}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="size-3.5" />
            {department.email}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {department.location}
          </span>
        </div>
      </motion.div>

      {/* stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
          <p className="cf-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            Employees
          </p>
          <p className="font-display italic text-2xl text-foreground mt-1">
            {DUMMY_EMPLOYEES.length}
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
          <p className="cf-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            Active Projects
          </p>
          <p className="font-display italic text-2xl text-foreground mt-1">
            {activeProjects}
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
          <p className="cf-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            Total Members
          </p>
          <p className="font-display italic text-2xl text-foreground mt-1">
            {department.members}
          </p>
        </div>
      </div>

      {/* employees */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <h2 className="font-display italic text-2xl text-foreground">
            Employees
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_EMPLOYEES.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 px-3.5 py-3"
            >
              <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground">
                {initials(employee.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">
                  {employee.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {employee.role}
                </p>
              </div>
              <span
                className={`cf-mono text-[10px] px-2 py-0.5 rounded-lg border shrink-0 ${
                  employee.status === "active"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : "bg-sky-500/10 border-sky-500/20 text-sky-500"
                }`}
              >
                {employee.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* projects */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FolderKanban className="size-4 text-muted-foreground" />
          <h2 className="font-display italic text-2xl text-foreground">
            Projects
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {DUMMY_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-border/60 bg-background/60 px-4 py-3.5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-semibold text-foreground">
                  {project.name}
                </p>
                <span
                  className={`cf-mono text-[10px] px-2 py-0.5 rounded-lg border shrink-0 ${PROJECT_STATUS_META[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project.progress}% complete</span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {project.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgDeparmentsDetailsPage;
