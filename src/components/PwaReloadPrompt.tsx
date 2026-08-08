import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";

const UPDATE_TOAST_ID = "pwa-update";

/**
 * Registers the service worker and surfaces updates as a toast.
 *
 * Deliberately opt-in: an operations app can be mid-order or mid-service when
 * a deploy lands, so the new version waits until someone chooses to reload.
 */
export default function PwaReloadPrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.error("Service worker registration failed", error);
    },
  });

  useEffect(() => {
    if (!needRefresh) return;

    toast.info("A new version is available", {
      id: UPDATE_TOAST_ID,
      duration: Infinity,
      description: "Reload when you're at a safe point to update.",
      action: {
        label: "Reload",
        // `true` activates the waiting worker and reloads the page
        onClick: () => void updateServiceWorker(true),
      },
    });
  }, [needRefresh, updateServiceWorker]);

  return null;
}
