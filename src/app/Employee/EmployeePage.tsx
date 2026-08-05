import { useEffect, useRef } from "react";
import { motion, useInView, animate, type Variants } from "framer-motion";

// typed cubic-bezier tuple so TS accepts it as an Easing value
const CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmployeesTable } from "@/components/tables/EmployeeTable";
import { useOrgEmployees } from "@/api/queries";
import { Users, UserCheck, CreditCard, Smartphone } from "lucide-react";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: CUBIC,
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>0</span>;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  delay?: number;
  accent: string; // tailwind text-* class for icon tint
}

function StatCard({ label, value, icon, delay = 0, accent }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: CUBIC }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden group border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* subtle gradient wash */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-muted/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="pb-3 flex flex-row items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              {label}
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums">
              <AnimatedCounter value={value} />
            </CardTitle>
          </div>

          {/* icon bubble */}
          <motion.div
            className={`mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-muted/70 ${accent} shrink-0`}
            whileHover={{
              rotate: [0, -8, 8, 0],
              transition: { duration: 0.4 },
            }}
          >
            {icon}
          </motion.div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Total Employees",
    value: 56,
    icon: <Users className="h-5 w-5" />,
    accent: "text-primary",
  },
  {
    label: "Active Employees",
    value: 42,
    icon: <UserCheck className="h-5 w-5" />,
    accent: "text-emerald-500",
  },
  {
    label: "Payroll Only",
    value: 10,
    icon: <CreditCard className="h-5 w-5" />,
    accent: "text-amber-500",
  },
  {
    label: "App Access",
    value: 32,
    icon: <Smartphone className="h-5 w-5" />,
    accent: "text-sky-500",
  },
];

// stagger container variants
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: CUBIC },
  },
};

export default function HRAllEmployeePage() {
  const { data } = useOrgEmployees();

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: CUBIC }}
        className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage all employees in your organisation
          </p>
        </div>

        {/* decorative line */}
        <motion.div
          className="hidden h-px flex-1 max-w-xs bg-linear-to-r from-transparent via-border to-transparent sm:block"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} delay={0.1 + i * 0.07} />
        ))}
      </div>

      {/* ── Table Section ── */}
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <div className="flex flex-col gap-0.5">
                <CardTitle className="text-base font-semibold">
                  Employee List
                </CardTitle>
                <CardDescription className="text-xs">
                  View and manage all registered employees
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <EmployeesTable employeeList={data?.data} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
