import PaymentQRWindow from "@/components/custom/payment-qr";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/payments/")({
  component: PaymentQRWindow,
});
