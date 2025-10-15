// src/hooks/usePolicySSE.ts
import { useEffect, useState } from "react";

export function usePolicySSE(employeeId: string | null) {
  const [policy, setPolicy] = useState<any>(null);

  useEffect(() => {
    if (!employeeId) return;

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/sse/policy/${employeeId}`,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🔄 Policy update:", data);
        setPolicy(data);
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [employeeId]);

  return policy;
}
