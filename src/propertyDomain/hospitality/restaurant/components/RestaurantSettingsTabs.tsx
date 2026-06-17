import MenuSettings from "@/propertyDomain/hospitality/infra/components/MenuSettings";
import { Route } from "@/routes/_appuser/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import RestaurantGeneralSettingsComp from "./RestaurantGeneralSettings";
import { RestaurantLayoutSettings } from "./RestaurantLayoutSettings";
import {
  AlertTriangle,
  Bell,
  ChefHat,
  LayoutGrid,
  Plus,
  Scale,
  Settings2,
  UtensilsCrossed,
} from "lucide-react";
import { RestaurantLegalEntity } from "./RestaurantLegalEntity";
import { usePropertyDetails } from "@/app/property/api/queries";
import { Button } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import { useRestaurantGeneralInfo } from "../apis/queries";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────────
   Tab configuration
───────────────────────────────────────────── */
type TabId = "Generals" | "Menu" | "layout" | "LegalEntity" | "Notifications";

const TABS: {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}[] = [
  { id: "Generals", label: "General", icon: <Settings2 className="h-4 w-4" /> },
  { id: "Menu", label: "Menu", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "layout", label: "Layouts", icon: <LayoutGrid className="h-4 w-4" /> },
  {
    id: "LegalEntity",
    label: "Legal Entity",
    icon: <Scale className="h-4 w-4" />,
  },
  {
    id: "Notifications",
    label: "Notifications",
    icon: <Bell className="h-4 w-4" />,
    disabled: true,
  },
];

/* ─────────────────────────────────────────────
   Motion variants
───────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.07, ease: EASE },
  }),
};

const tabContent: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.18 } },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const RestaurantSettingsTabs = () => {
  const { restaurantID, propertyId } = Route.useParams();
  const { data: propertyDetails } = usePropertyDetails(propertyId);
  const { data: restaurantDetails } = useRestaurantGeneralInfo(restaurantID!);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabId>("Generals");

  const handleNav = () =>
    navigate({ to: "/property/$propertyId/details", params: { propertyId } });

  const hasKitchen = propertyDetails?.data?.infra?.some(
    (infra) => infra.infra_type === "KITCHEN",
  );

  return (
    <div className="">
      {/* ── Hero header ──────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="relative mb-2 flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 shadow-sm"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 0% 50%, hsl(var(--primary)/0.06) 0%, transparent 70%)",
          }}
        />
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
          <ChefHat className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-semibold leading-none text-foreground">
            Restaurant Settings
          </h1>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            Manage layout, menu, operating hours and core configuration.
          </p>
        </div>
      </motion.div>

      {/* ── Tab bar ──────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="mb-4"
      >
        <div className="relative flex gap-1 rounded-xl border bg-muted/40 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              className={[
                "relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5",
                "text-sm font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                tab.disabled
                  ? "cursor-not-allowed opacity-40 text-muted-foreground"
                  : activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              ].join(" ")}
            >
              {/* Sliding pill indicator */}
              {activeTab === tab.id && !tab.disabled && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg bg-background shadow-sm ring-1 ring-border/60"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Tab content ──────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.5}
        className="rounded-xl border shadow-sm"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-5"
          >
            {activeTab === "Generals" && <RestaurantGeneralSettingsComp />}

            {activeTab === "Menu" && (
              <>
                {!hasKitchen ? (
                  <EmptyKitchenState onAdd={handleNav} />
                ) : (
                  <MenuSettings
                    moduleID={restaurantID}
                    propertyID={propertyId}
                    owners_legal_entityID={
                      restaurantDetails?.data?.resturant_legal_entity_id
                    }
                  />
                )}
              </>
            )}

            {activeTab === "layout" && <RestaurantLayoutSettings />}

            {activeTab === "LegalEntity" && <RestaurantLegalEntity />}

            {activeTab === "Notifications" && (
              <p className="text-sm text-muted-foreground">
                Notifications Settings Content
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Empty kitchen state
───────────────────────────────────────────── */
const EmptyKitchenState = ({ onAdd }: { onAdd: () => void }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed py-16 text-center"
  >
    {/* Pulsing icon ring */}
    <div className="relative flex h-16 w-16 items-center justify-center">
      <motion.span
        animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-destructive/20"
      />
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 ring-1 ring-destructive/20">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>
    </div>

    <div className="space-y-1">
      <h3 className="text-base font-semibold text-foreground">
        No Kitchen Found
      </h3>
      <p className="max-w-xs text-sm text-muted-foreground">
        A kitchen is required before you can configure menu settings.
      </p>
    </div>

    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
      <Button onClick={onAdd} size="sm" className="gap-2 px-5">
        <Plus className="h-4 w-4" />
        Add Kitchen
      </Button>
    </motion.div>
  </motion.div>
);

export default RestaurantSettingsTabs;
