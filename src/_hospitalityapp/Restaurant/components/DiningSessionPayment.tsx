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
import { ChevronsUpDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useOrgsCustomer } from "@/apis/Queries";
import { PAYMENT_METHODS } from "../utils/payment_method";
import { useDebounce } from "@/hooks/useDebounce";
import { Avatar } from "./AvatarPaymentCard";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { usePaymentAccounts } from "@/_orchestrator/payments/api/api.queries";
import { useCloseDiningSessionMutation } from "../apis/mutations";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
interface Props {
  openModal: boolean;
  setPaymentModal: Dispatch<SetStateAction<boolean>>;
  amount?: number;
  diningSessionID: string;
  restaurantID: string;
}

// ... imports stay the same

export function DiningSessionPayment({
  openModal,
  setPaymentModal,
  amount,
  diningSessionID,
  restaurantID,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const debounced = useDebounce(query, 400);

  const { data, isFetching } = useOrgsCustomer(debounced);
  const { data: paymentAccounts } = usePaymentAccounts();

  const customers: Customer[] =
    data?.data?.map((c: any) => ({
      id: c.ID,
      name: c.Name,
      phone: c.Phone,
      email: c.Email,
      gst: c.GSTIN,
    })) ?? [];

  const isEmpty = debounced.length >= 4 && customers.length === 0;

  const { mutateAsync } = useCloseDiningSessionMutation();

  const form = useAppForm({
    defaultValues: {
      payment_method: "CASH",
      payment_account_id: paymentAccounts?.data[0]?.Id,
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      customer_id: "",
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(
        {
          diningSessionID: diningSessionID,
          payload: value,
          restuarantID: restaurantID,
        },
        {
          onSuccess() {},
        },
      );
    },
  });

  const handleClose = () => {
    form.reset();
    setQuery("");
    setPaymentModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[60rem] h-[40rem] gap-0 flex flex-col p-0">
        <DialogHeader className="px-5 py-3.5 border-b shrink-0 bg-muted/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-semibold">
              Confirm Payment
            </DialogTitle>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {/* Simple monochrome status indicator */}
              <span className="h-1.5 w-1.5 rounded-full bg-foreground inline-block" />
              Processing Session
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex-1 flex flex-col"
        >
          <div className="p-6 space-y-6 flex-1">
            {/* --- Customer Search --- */}
            <div className="max-w-md space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Customer
              </label>
              <form.AppField
                name="customer_id"
                children={(field) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between h-10 font-normal"
                      >
                        {form.getFieldValue("customer_name") ||
                          "Search by name, phone..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[var(--radix-popover-trigger-width)] p-0"
                      align="start"
                    >
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Name, phone or email…"
                          value={query}
                          onValueChange={setQuery}
                        />
                        <CommandList>
                          <ScrollArea className="max-h-[250px]">
                            {debounced.length < 4 && !isFetching && (
                              <div className="p-4 text-xs text-muted-foreground text-center">
                                Type at least 4 characters...
                              </div>
                            )}

                            {isFetching && (
                              <div className="p-4 text-xs text-center">
                                Searching...
                              </div>
                            )}

                            <CommandGroup>
                              {customers.map((c) => (
                                <CommandItem
                                  key={c.id}
                                  onSelect={() => {
                                    // Update multiple fields at once
                                    field.handleChange(c.id);
                                    form.setFieldValue("customer_name", c.name);
                                    form.setFieldValue(
                                      "customer_phone",
                                      c.phone,
                                    );
                                    form.setFieldValue(
                                      "customer_email",
                                      c.email || "",
                                    );
                                    setOpen(false);
                                  }}
                                  className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                                >
                                  <Avatar name={c.name} size="sm" />
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium truncate">
                                      {c.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {c.phone}
                                    </span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>

                            {isEmpty && (
                              <div className="p-4 text-center">
                                <CommandEmpty>No customer found.</CommandEmpty>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="w-full mt-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                    // Trigger your "Add Customer" logic here
                                  }}
                                >
                                  + Add New Customer
                                </Button>
                              </div>
                            )}
                          </ScrollArea>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            {/* --- Payment Method Selection --- */}
            <div className="max-w-md space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Payment Method
              </label>
              <form.AppField
                name="payment_method"
                children={(field) => (
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map((pm) => (
                        <SelectItem key={pm.value} value={pm.value}>
                          <div className="flex items-center gap-2">
                            <pm.Icon className="h-4 w-4" />
                            <span>{pm.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* --- Sticky Footer --- */}
          <div className="p-4 border-t flex items-center justify-between bg-muted/10">
            <div className="flex flex-col px-2">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">
                Amount Due
              </span>
              <span className="text-lg font-mono font-bold">
                {amount?.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button type="button" variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="px-8"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Payment"}
                  </Button>
                )}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
