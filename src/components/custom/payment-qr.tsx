import { useEffect, useState } from "react";

export default function PaymentQRWindow() {
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    let expiryTimer: number | undefined;

    const handler = (event: MessageEvent) => {
      if (event.data.type === "QR_READY") {
        setQr(event.data.qr);

        // clear any previous timer
        if (expiryTimer) window.clearTimeout(expiryTimer);

        // use server expiry if provided
        const expiry = event.data.expires_in ?? 600;

        expiryTimer = window.setTimeout(() => {
          window.close();
        }, expiry * 1000);
      }

      if (event.data.type === "PAID") {
        window.close();
      }

      if (event.data.type === "EXPIRED") {
        window.close();
      }
    };

    window.addEventListener("message", handler);

    // 🔥 fallback: always close after 10 minutes
    const fallbackTimer = window.setTimeout(
      () => {
        window.close();
      },
      10 * 60 * 1000,
    );

    return () => {
      window.removeEventListener("message", handler);
      if (expiryTimer) window.clearTimeout(expiryTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-lg font-semibold">Scan to Pay</h2>

      {qr ? (
        <img src={qr} alt="QR Code" />
      ) : (
        <p className="animate-pulse">Generating QR...</p>
        
      )}
      <div>{}</div>
    </div>
  );
}
