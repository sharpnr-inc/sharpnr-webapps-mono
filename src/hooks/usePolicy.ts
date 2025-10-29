// src/hooks/usePolicySSE.ts
import { useEffect, useState } from "react";
import { useLoader } from "@/context/LoaderContext";

export function usePolicySSE(employeeId: string | null) {
  const [policy, setPolicy] = useState<any>(null);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (!employeeId) return;

    // Show loader before SSE connection starts
    showLoader();

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/sse/policy/${employeeId}`,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🔄 Policy update:", data);
        setPolicy(data);

        // ✅ Hide loader once first policy is received
        hideLoader();
      } catch (error) {
        console.error("Error parsing SSE data:", error);
        hideLoader();
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      hideLoader();
      eventSource.close();
    };

    return () => {
      eventSource.close();
      hideLoader();
    };
  }, [employeeId]);

  return policy;
}
