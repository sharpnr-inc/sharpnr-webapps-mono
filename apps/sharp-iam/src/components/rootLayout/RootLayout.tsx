import { Outlet, useRouteContext, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@sharpnr/ui";
import { AppSidebar } from "./AppSidebar";
import {
  ModeToggle,
  NotificationBell,
  UserCard,
  SharpnrLauncher,
} from "@sharpnr/ui";
import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutations";
import { useSheet } from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { motion, AnimatePresence } from "framer-motion";

const RootLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
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
      <AppShell
        sidebar={<AppSidebar />}
        headerActions={
          <>
            <SharpnrLauncher
              currentApp="iam"
              onNavigate={(to) => navigate({ to })}
            />
            <NotificationBell onClick={() => handleOpenNotification()} />
            <UserCard
              user={user}
              isLoading={isLoadingUser}
              onLogout={() => logoutUser()}
              isLoggingOut={isLoggingOut}
            />
            <ModeToggle />
          </>
        }
      >
        <Outlet />
      </AppShell>
    </>
  );
};

export default RootLayout;
