import { useState, useEffect } from "react";
import { config } from "@/configs/env";

const BASE_URL = config.apiBaseUrl;

export function useKitchenKOTsSSE(kitchenID: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!kitchenID) return;

    // Initialize SSE with withCredentials: true to send cookies/session
    const url = `${BASE_URL}/sharp-hospitality/kitchen/${kitchenID}/kot/orders`;
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onopen = () => {
      setIsLoading(false);
      setIsError(false);
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData({ data: parsedData });
      } catch (err) {
        console.error("KDS SSE Parse Error:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("KDS SSE Connection Error:", err);
      setIsError(true);
      setIsLoading(false);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [kitchenID]);

  return { data, isLoading, isError };
}
