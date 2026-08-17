import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import { Separator } from "@sharpnr/ui";
import { Route } from "@/routes/_layout/employees/$employeeId";
import {
  ArrowLeft,
  LayoutDashboard,
  CalendarClock,
  TreePalm,
  Banknote,
  FileText,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";

import EmployeeDetailsOverviewTab from "./components/EmployeeDetailsOverviewTab";
import EmployeeDetailsAttendanceTab from "./components/EmployeeDetailsAttendanceTab";
import EmployeeDetailsLeavesTab from "./components/EmployeeDetailsLeavesTab";
import EmployeeDetailsPayrollTab from "./components/EmployeeDetailsPayrollTab";
import EmployeeDetailsDocsTab from "./components/EmployeeDetailsDocsTab";

// ─── Constants ────────────────────────────────────────────────────────────────
const CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TABS = [
  { value: "overview", label: "Overview", icon: LayoutDashboard },
  { value: "attendance", label: "Attendance", icon: CalendarClock },
  { value: "leaves", label: "Leaves", icon: TreePalm },
  { value: "payroll", label: "Payroll", icon: Banknote },
  { value: "documents", label: "Documents", icon: FileText },
] as const;

type TabValue = (typeof TABS)[number]["value"];

// ─── Avatar ───────────────────────────────────────────────────────────────────
function EmployeeAvatar({ name }: { name?: string }) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45, ease: CUBIC }}
      className="relative shrink-0"
    >
      {/* outer ring */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-2 ring-primary/20 shadow-lg shadow-primary/10">
        <span className="text-xl font-bold tracking-tight text-primary">
          {initials}
        </span>
      </div>
      {/* active dot */}
      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-2 ring-background">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
      </span>
    </motion.div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function PageHeader({
  name,
  emplID,
  onBack,
}: {
  name?: string;
  emplID?: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* back row */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: CUBIC }}
        className="flex items-center gap-2"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="group -ml-1 h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-xs font-medium">Back</span>
        </Button>

        <Separator orientation="vertical" className="h-4" />

        <span className="text-xs text-muted-foreground/60">Employees</span>
        <span className="text-xs text-muted-foreground/40">/</span>
        <span className="text-xs text-muted-foreground">
          {name ?? "Employee Details"}
        </span>
      </motion.div>

      {/* identity row */}
      <div className="flex items-center gap-4">
        <EmployeeAvatar name={name} />

        <div className="flex flex-col gap-1.5 min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: CUBIC }}
            className="truncate text-xl font-bold tracking-tight"
          >
            {name ?? "—"}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: CUBIC }}
            className="flex flex-wrap items-center gap-2"
          >
            {emplID && (
              <Badge
                variant="secondary"
                className="h-5 gap-1 rounded-md px-1.5 font-mono text-[10px]"
              >
                <User className="h-2.5 w-2.5" />
                {emplID}
              </Badge>
            )}
            <Badge className="h-5 rounded-md bg-emerald-500/15 px-1.5 text-[10px] font-medium text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400">
              Active
            </Badge>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────
function TabBar({
  active,
  onChange,
}: {
  active: TabValue;
  onChange: (v: TabValue) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18, ease: CUBIC }}
      className="relative flex gap-0.5 border-b border-border/60"
    >
      {TABS.map(({ value, label, icon: Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`group relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-150
              ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
          >
            <Icon
              className={`h-3.5 w-3.5 shrink-0 transition-colors duration-150
                ${isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
            />
            <span className="hidden sm:inline">{label}</span>

            {/* sliding underline */}
            {isActive && (
              <motion.div
                layoutId="tab-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
                transition={{ duration: 0.25, ease: CUBIC }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}

// ─── Tab Content Wrapper ──────────────────────────────────────────────────────
const contentVariants = {
  enter: (dir: number) => ({
    x: dir * 24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: CUBIC },
  },
  exit: (dir: number) => ({
    x: dir * -24,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  }),
};

function TabContent({
  activeTab,
  employeeId,
}: {
  activeTab: TabValue;
  employeeId: string;
}) {
  const tabOrder = TABS.map((t) => t.value);
  const [prevTab, setPrevTab] = useState<TabValue>(activeTab);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const prevIdx = tabOrder.indexOf(prevTab);
    const nextIdx = tabOrder.indexOf(activeTab);
    setDirection(nextIdx > prevIdx ? 1 : -1);
    setPrevTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeTab}
          custom={direction}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="pt-4"
        >
          {activeTab === "overview" && (
            <EmployeeDetailsOverviewTab employeeId={employeeId} />
          )}
          {activeTab === "attendance" && (
            <EmployeeDetailsAttendanceTab employeeId={employeeId} />
          )}
          {activeTab === "leaves" && (
            <EmployeeDetailsLeavesTab employeeId={employeeId} />
          )}
          {activeTab === "payroll" && (
            <EmployeeDetailsPayrollTab employeeId={employeeId} />
          )}
          {activeTab === "documents" && (
            <EmployeeDetailsDocsTab employeeId={employeeId} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function EmployeeDetailsPage() {
  const { employeeId } = Route.useParams();
  const { emplName, emplID } = Route.useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  // derive initial tab from URL hash  e.g. #attendance
  const hashTab = location.hash.replace("#", "") as TabValue;
  const validTab = TABS.some((t) => t.value === hashTab) ? hashTab : "overview";
  const [activeTab, setActiveTab] = useState<TabValue>(validTab);

  // keep hash in sync when tab changes
  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    navigate({ hash: tab, replace: true });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto">
      {/* ── Header ── */}
      <PageHeader
        name={emplName}
        emplID={emplID}
        onBack={() => window.history.back()}
      />

      {/* ── Tab Bar + Content ── */}
      <div className="flex flex-col gap-0">
        <TabBar active={activeTab} onChange={handleTabChange} />
        <TabContent activeTab={activeTab} employeeId={employeeId} />
      </div>
    </div>
  );
}
