import { Outlet, useRouteContext } from "@tanstack/react-router";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@sharpnr/ui";
import { AppSidebar } from "./AppSidebar";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "@sharpnr/ui";
import SharpnrLauncher from "./header/SharpnrLauncher";
import { NotificationBell } from "./header/NotificationButton";
import { UserCard } from "./header/UserCard";
import { useSheet } from "@/hooks/useSheets";
import { config } from "@/configs/env";
import { motion, AnimatePresence } from "framer-motion";

const RootLayout: React.FC = () => {
  const { openSheet } = useSheet();
  const { showSetupOverlay } = useRouteContext({ from: "/_user" });

  const handleOpenNotification = () => {
    openSheet(<>HI</>, "1/4");
  };
  return (
    <>
      {showSetupOverlay && (
        <AnimatePresence>
          <motion.div
            key="overlay-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(13, 15, 60, 0.75)",
            }}
          >
            {/* Card */}
            <motion.div
              key="overlay-card"
              initial={{ opacity: 0, scale: 0.88, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                delay: 0.05,
              }}
              className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl"
              style={{
                background: "linear-gradient(160deg, #12155a 0%, #0D0F3C 60%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 8px 64px 0 rgba(13,15,60,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset",
              }}
            >
              {/* Top accent bar — white to match your logo "A" */}
              <motion.div
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #ffffff80, #fff, #ffffff80, transparent)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
              />

              <div className="px-8 py-10 text-center">
                {/* Icon — your "A" logo mark */}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                    delay: 0.15,
                  }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background: "#0D0F3C",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 0 32px rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Replicating your "A" logo */}
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M14 3L3 25h4.5l2.5-5h8l2.5 5H25L14 3z"
                      fill="white"
                    />
                    <path d="M10.5 17l3.5-7 3.5 7h-7z" fill="#0D0F3C" />
                  </svg>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <h2 className="mb-2 text-xl font-semibold tracking-tight text-white">
                    Setup Not Complete
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Complete your organization setup to unlock the full platform
                    experience.
                  </p>
                </motion.div>

                {/* Button */}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    window.location.replace(
                      config.orchestratorAppUrl + "/setup_wizard",
                    )
                  }
                  className="mt-8 w-full rounded-xl px-6 py-3 text-sm font-medium text-[#0D0F3C] transition-all"
                  style={{
                    background: "#ffffff",
                    boxShadow: "0 4px 24px rgba(255,255,255,0.15)",
                  }}
                >
                  Continue Setup →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <Sidebar collapsible="icon">
            <AppSidebar />
          </Sidebar>

          {/* Main */}
          <div className="flex flex-1 flex-col">
            <header className="flex h-12 items-center justify-between border-b px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
              </div>
              <div className="flex items-center gap-3 px-4">
                <SharpnrLauncher />
                <NotificationBell onClick={() => handleOpenNotification()} />
                <UserCard />
                <ModeToggle />
              </div>
            </header>

            <main className="flex-1 p-3">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default RootLayout;
