import { Banknote, CreditCard, Smartphone } from "lucide-react";

export const PAYMENT_METHODS = [
  {
    value: "CASH" as const,
    label: "Cash",
    Icon: Banknote,
    activeClass:
      "border-emerald-500 bg-emerald-500 text-white shadow-emerald-200 shadow-md",
    idleClass:
      "border-border text-muted-foreground hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50",
  },
  {
    value: "upi" as const,
    label: "UPI",
    Icon: Smartphone,
    activeClass:
      "border-violet-500 bg-violet-500 text-white shadow-violet-200 shadow-md",
    idleClass:
      "border-border text-muted-foreground hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/50",
  },
  {
    value: "card" as const,
    label: "Card",
    Icon: CreditCard,
    activeClass:
      "border-blue-500 bg-blue-500 text-white shadow-blue-200 shadow-md",
    idleClass:
      "border-border text-muted-foreground hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50",
  },
];
