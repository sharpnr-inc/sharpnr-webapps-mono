import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  Mail,
  MapPin,
  Network,
  ArrowUpRight,
  UserRound,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useModal } from "@sharpnr/ui";
import CreateDepartmentsForm from "../components/CreateDepartmentsForm";
import { DUMMY_DEPARTMENTS, type Department } from "../data/dummyDepartments";

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
   Department Card
───────────────────────────────────────────── */

function DepartmentCard({
  department,
  index,
  onClick,
}: {
  department: Department;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 cursor-pointer hover:border-primary/30 hover:shadow-[0_8px_28px_hsl(var(--primary)/0.1)] transition-all duration-200 overflow-hidden"
    >
      {/* hover wash */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

      {/* top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-linear-to-br from-primary/25 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <span className="cf-mono text-xs font-bold text-primary">
              {initials(department.name)}
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {department.name}
            </p>
            <p className="cf-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              {department.code}
            </p>
          </div>
        </div>

        <ArrowUpRight className="size-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors shrink-0" />
      </div>

      {/* divider */}
      <div className="h-px bg-border/40 mb-4" />

      {/* info */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <UserRound className="size-3 shrink-0" />
          <span>{department.head}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="size-3 shrink-0" />
          <span className="truncate">{department.email}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          <span>{department.location}</span>
        </div>
      </div>

      {/* footer badges */}
      <div className="flex items-center gap-1.5">
        <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-muted/30 border-border/40 text-muted-foreground flex items-center gap-1">
          <Users className="size-2.5" />
          {department.members} members
        </span>

        <span
          className={`cf-mono text-[10px] px-2 py-0.5 rounded-lg border ml-auto ${
            department.status === "active"
              ? "bg-primary/10 border-primary/20 text-primary"
              : "bg-muted/30 border-border/40 text-muted-foreground/40"
          }`}
        >
          {department.status}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

const OrgDepartmentsIndexPage = () => {
  const nav = useNavigate();
  const { openModal, closeModal } = useModal();

  const [query, setQuery] = useState("");

  const departments = DUMMY_DEPARTMENTS;

  const filtered = useMemo(
    () =>
      departments.filter((d) => {
        return (
          !query ||
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.code.toLowerCase().includes(query.toLowerCase()) ||
          d.head.toLowerCase().includes(query.toLowerCase())
        );
      }),
    [departments, query],
  );

  const handleNewDepartment = () => {
    openModal({
      content: <CreateDepartmentsForm closeModal={closeModal} />,
      title: "Add New Department",
      description: "This will add new department in organization wise",
    });
  };

  return (
    <div className="cf-font relative z-10 flex flex-col p-6 md:p-10 gap-8">
      {/* header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary cf-mono text-[10px] tracking-widest uppercase">
            <Network className="size-3" /> Organisation
          </span>

          <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
            Departments
          </h1>

          <div className="flex items-baseline gap-2">
            <span className="font-display italic text-2xl text-foreground">
              {departments.length}
            </span>
            <span className="text-xs text-muted-foreground">
              Total Departments
            </span>
          </div>
        </div>

        <button
          onClick={handleNewDepartment}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-3.5" />
          Add Department
        </button>
      </motion.div>

      {/* search */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-background/60 w-full sm:w-72">
        <Search className="size-3.5 text-muted-foreground shrink-0" />

        <input
          type="text"
          placeholder="Search name, code, head…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="cf-mono bg-transparent text-xs w-full outline-none"
        />

        {query && (
          <button onClick={() => setQuery("")} className="text-[10px]">
            ✕
          </button>
        )}
      </div>

      {/* grid */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Network className="size-6 text-muted-foreground/30" />

          <p className="font-display italic text-xl text-foreground">
            No departments found
          </p>

          <button
            onClick={handleNewDepartment}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs"
          >
            <Plus className="size-3.5" /> Add Department
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <AnimatePresence mode="popLayout">
          <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((department, i) => (
              <DepartmentCard
                key={department.ID}
                department={department}
                index={i}
                onClick={() => {
                  nav({
                    to: "/deparments/$departmentID",
                    params: { departmentID: department.ID },
                  });
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default OrgDepartmentsIndexPage;
