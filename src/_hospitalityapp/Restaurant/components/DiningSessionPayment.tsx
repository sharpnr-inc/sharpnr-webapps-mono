import React from "react";
import { useAppForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ChevronsUpDown,
  UserPlus,
  CreditCard,
  Banknote,
  Smartphone,
  X,
  Check,
  Receipt,
  Users,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import { useOrgsCustomer } from "@/apis/Queries";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

type PaymentMethod = "cash" | "upi" | "card" | "";

/* ─────────────────────────────────────────
   PAYMENT METHODS
───────────────────────────────────────── */
const PAYMENT_METHODS = [
  {
    value: "cash" as const,
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

/* ─────────────────────────────────────────
   DEBOUNCE
───────────────────────────────────────── */
function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* ─────────────────────────────────────────
   AVATAR
───────────────────────────────────────── */
function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const cls = {
    xs: "h-5 w-5 text-[9px]",
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  }[size];
  return (
    <div
      className={cn(
        "rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0",
        cls,
      )}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/* ─────────────────────────────────────────
   CUSTOMER COMBOBOX
───────────────────────────────────────── */
function CustomerCombobox({
  selected,
  onSelect,
  onCreate,
}: {
  selected: Customer | null;
  onSelect: (c: Customer) => void;
  onCreate: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const debounced = useDebounce(query, 400);

  const { data, isFetching } = useOrgsCustomer(debounced);

  // 🔥 map API → UI
  const customers: Customer[] =
    data?.data?.map((c: any) => ({
      id: c.ID,
      name: c.Name,
      phone: c.Phone,
      email: c.Email,
      gst: c.GSTIN,
    })) ?? [];

  const isEmpty = debounced.length >= 4 && customers.length === 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-9 font-normal text-sm",
            !selected && "text-muted-foreground",
          )}
        >
          {selected ? (
            <span className="flex items-center gap-2 min-w-0">
              <Avatar name={selected.name} size="xs" />
              <span className="truncate">{selected.name}</span>
            </span>
          ) : (
            "Search by name, phone…"
          )}
          <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-40" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        sideOffset={4}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Name, phone or email…"
            value={query}
            onValueChange={setQuery}
            className="h-9 text-sm"
          />

          <CommandList>
            <ScrollArea className="max-h-[200px]">
              {/* ⛔ min chars */}
              {debounced.length < 4 && (
                <div className="p-3 text-xs text-muted-foreground">
                  Type at least 4 characters...
                </div>
              )}

              {/* 🔄 loading */}
              {isFetching && <div className="p-3 text-xs">Searching...</div>}

              {/* ✅ results */}
              {customers.length > 0 && (
                <CommandGroup>
                  {customers.map((c) => (
                    <CommandItem
                      key={c.id}
                      value={c.id}
                      onSelect={() => {
                        onSelect(c);
                        setOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 cursor-pointer"
                    >
                      <Avatar name={c.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.phone}
                        </p>
                      </div>

                      {selected?.id === c.id && (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* ❌ empty → create */}
              {isEmpty && (
                <div className="p-3">
                  <CommandEmpty>No customer found.</CommandEmpty>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // 🔥 prevent dialog close
                      onCreate();
                      setOpen(false);
                    }}
                  >
                    + Add Customer
                  </Button>
                </div>
              )}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
/* ─────────────────────────────────────────
   LEFT PANEL — CUSTOMER
   Fixed height. ScrollArea handles overflow
   when the "Add New" form is open.
───────────────────────────────────────── */
function CustomerPanel({
  selected,
  onSelect,
  onClear,
  form,
}: {
  selected: Customer | null;
  onSelect: (c: Customer) => void;
  onClear: () => void;
  form: any;
}) {
  const [createMode, setCreateMode] = React.useState(false);

  const handleSelect = (c: Customer) => {
    onSelect(c);
    setCreateMode(false);
  };

  const handleClear = () => {
    onClear();
    setCreateMode(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold leading-none">Customer</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Optional · for invoice / loyalty
            </p>
          </div>
        </div>

        {/* Combobox always visible */}
        <CustomerCombobox
          selected={selected}
          onSelect={handleSelect}
          onCreate={() => setCreateMode(true)}
        />
      </div>

      <Separator />

      {/*
        ScrollArea fills remaining panel height.
        Content inside can grow freely (new customer form)
        without affecting the right panel at all.
      */}

      <div className="px-4 py-3 space-y-3">
        {/* ── SELECTED STATE ── */}
        {selected && !createMode && (
          <div className="space-y-3">
            {/* Profile card */}
            <div className="rounded-xl border bg-muted/30 p-3 space-y-2">
              <div className="flex items-start gap-3">
                <Avatar name={selected.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {selected.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selected.phone}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {selected.email}
                  </p>
                </div>
                <Badge className="shrink-0 h-5 text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                  <Check className="h-2.5 w-2.5 mr-1" />
                  Linked
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs gap-1.5"
                onClick={handleClear}
              >
                <X className="h-3 w-3" /> Remove
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs gap-1.5"
                onClick={() => {
                  handleClear();
                  setCreateMode(true);
                }}
              >
                <UserPlus className="h-3 w-3" /> Change
              </Button>
            </div>

            {/* GST field for invoicing */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                GST Number <span className="font-normal">(optional)</span>
              </label>
              <form.AppField
                name="gst_number"
                children={(f: any) => (
                  <f.TextField placeholder="22AAAAA0000A1Z5" />
                )}
              />
            </div>
          </div>
        )}

        {/* ── EMPTY + NO CREATE MODE ── */}
        {!selected && !createMode && (
          <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                No customer linked
              </p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                Search above or add new
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 mt-1"
              onClick={() => setCreateMode(true)}
            >
              <UserPlus className="h-3.5 w-3.5" />
              Add New Customer
            </Button>
          </div>
        )}

        {/* ── CREATE NEW FORM ── */}
        {!selected && createMode && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground">
                <UserPlus className="h-3.5 w-3.5" /> New Customer
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground"
                onClick={() => setCreateMode(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            <form.AppField
              name="customer_name"
              children={(f: any) => <f.TextField label="Full Name" />}
            />
            <form.AppField
              name="customer_phone"
              children={(f: any) => <f.TextField label="Phone *" />}
            />
            <form.AppField
              name="customer_email"
              children={(f: any) => <f.TextField label="Email" />}
            />
            <form.AppField
              name="gst_number"
              children={(f: any) => (
                <f.TextField
                  label="GST Number"
                  placeholder="22AAAAA0000A1Z5 (optional)"
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   RIGHT PANEL — PAYMENT
   Static layout, no scroll needed.
───────────────────────────────────────── */
function PaymentPanel({
  amount,
  paymentMethod,
  onMethodChange,
}: {
  amount: number;
  paymentMethod: PaymentMethod;
  onMethodChange: (m: PaymentMethod) => void;
}) {
  const subtotal = Math.round(amount / 1.18);
  const gst = amount - subtotal;

  const handlePay = () => {
    // 1. Open window immediately (VERY IMPORTANT)
    const child = window.open("/payments", "_blank", "width=400,height=600");

    if (!child) return;

    // 2. Simulate backend delay (3 sec)
    setTimeout(() => {
      const dummyQR =
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DummyPayment123";

      // 3. Send QR to child window
      child.postMessage(
        {
          type: "QR_READY",
          qr: dummyQR,
          expires_in: 600, // 10 min
        },
        "*",
      );
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full px-4 pt-4 pb-4 gap-4">
      {/* Panel header */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Receipt className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold leading-none">Payment</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Select method &amp; confirm
          </p>
        </div>
      </div>

      {/* Method selector */}
      <div className="space-y-2 shrink-0">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Method
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {PAYMENT_METHODS.map(
            ({ value, label, Icon, activeClass, idleClass }) => (
              <button
                key={value}
                type="button"
                onClick={() => onMethodChange(value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-150",
                  paymentMethod === value ? activeClass : idleClass,
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                <span className="text-[11px] font-medium">{label}</span>
              </button>
            ),
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bill summary */}
      <div className="space-y-2 shrink-0">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Bill Summary
        </p>
        <div className="rounded-xl border overflow-hidden divide-y bg-muted/20 text-sm">
          <div className="flex justify-between px-3 py-2 text-muted-foreground">
            <span>Subtotal</span>
            <span className="tabular-nums">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between px-3 py-2 text-muted-foreground text-xs">
            <span>GST (18%)</span>
            <span className="tabular-nums">₹{gst.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between px-3 py-2.5 font-bold bg-muted/40">
            <span>Total</span>
            <span className="tabular-nums text-base">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button
        type="button"
        onClick={handlePay}
        className="w-full h-11 font-semibold text-sm gap-2 shrink-0"
        disabled={!paymentMethod}
      >
        {paymentMethod ? (
          <>
            Pay ₹{amount.toLocaleString("en-IN")}
            <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          "Select a method"
        )}
      </Button>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
interface Props {
  openModal: boolean;
  setPaymentModal: Dispatch<SetStateAction<boolean>>;
  amount?: number;
}

export function DiningSessionPayment({
  openModal,
  setPaymentModal,
  amount = 500,
}: Props) {
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("");

  const form = useAppForm({
    defaultValues: {
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      gst_number: "",
    },
    onSubmit: ({ value }) => {
      if (!paymentMethod) {
        alert("Select a payment method.");
        return;
      }
      console.log("PAYMENT CONFIRMED:", {
        customer: selectedCustomer ?? (value.customer_phone ? value : null),
        paymentMethod,
        amount,
      });
      handleClose();
    },
  });

  const handleClose = () => {
    setSelectedCustomer(null);
    setPaymentMethod("");
    form.reset();
    setPaymentModal(false);
  };

  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c);
    form.setFieldValue("customer_name", c.name);
    form.setFieldValue("customer_phone", c.phone);
    form.setFieldValue("customer_email", c.email);
  };

  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    form.setFieldValue("customer_name", "");
    form.setFieldValue("customer_phone", "");
    form.setFieldValue("customer_email", "");
  };

  return (
    <Dialog open={openModal} onOpenChange={handleClose}>
      {/*
        Two-column layout:
          Left  (flex-1)     → Customer panel  — has its own ScrollArea
          Right (w-[220px])  → Payment panel   — static, no scroll
        The dialog height is fixed at 480px.
        Nothing can resize it — left scroll handles overflow independently.
      */}
      <DialogContent className="sm:max-w-[640px] h-[520px] p-0 gap-0 overflow-hidden flex flex-col">
        {/* ── Sticky Top Header ── */}
        <DialogHeader className="px-5 py-3.5 border-b shrink-0 bg-muted/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-semibold">
              Confirm Payment
            </DialogTitle>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              Table 4 · 3 items
            </div>
          </div>
        </DialogHeader>

        {/* ── Two-column body — fixed height, no outer scroll ── */}
        <form
          id="payment-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-1 min-h-0 overflow-hidden"
        >
          {/* LEFT — Customer (scrollable inside) */}
          <div className="flex-1 border-r flex flex-col min-h-0 min-w-0">
            <CustomerPanel
              selected={selectedCustomer}
              onSelect={handleSelectCustomer}
              onClear={handleClearCustomer}
              form={form}
            />
          </div>

          {/* RIGHT — Payment (static) */}
          <div className="w-[220px] shrink-0 flex flex-col min-h-0">
            <PaymentPanel
              amount={amount}
              paymentMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
