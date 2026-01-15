import { useMutateCreateAccountMapping } from "@/_accountingapp/api/mutations/acc_mappings";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";


export function CreateAccountMappingModal() {
  const createMapping = useMutateCreateAccountMapping();
  const form = useForm({
    defaultValues: {
      source_type: "",
      source_code: "",
      account_id: "2345687510098",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted Data:", value);
      createMapping.mutateAsync(value);
    },
  });

  return (
    <div className="w-full">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Account Mapping</FieldLegend>
            <FieldDescription>
              These rules decide what charges recorded where
            </FieldDescription>

            <div className="flex gap-5 items-end">
              {/* 1. SOURCE TYPE */}
              <form.Field
                name="source_type"
                children={(field) => (
                  <Field className="flex-1">
                    <FieldLabel htmlFor={field.name}>Source Type</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => {
                        field.handleChange(val);
                        form.setFieldValue("source_code", ""); // Reset code when type changes
                      }}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Select Source Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Revenue / Cost generation</SelectLabel>
                          <SelectItem value="CHARGE">Charge</SelectItem>
                          <SelectItem value="TAX">Tax</SelectItem>
                          <SelectItem value="PAYMENT">Payment</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>System / Adjustments</SelectLabel>
                          <SelectItem value="SYSTEM">System</SelectItem>
                          <SelectItem value="ADJUSTMENT">Adjustment</SelectItem>
                          <SelectItem value="REFUND">Refund</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* 2. SOURCE CODE (All your constants restored) */}
              <form.Subscribe
                selector={(state) => state.values.source_type}
                children={(sourceType) => (
                  <form.Field
                    name="source_code"
                    children={(field) => (
                      <Field className="flex-1">
                        <FieldLabel htmlFor={field.name}>
                          Source code
                        </FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={field.handleChange}
                          disabled={!sourceType}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select Charge Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* --- CHARGE OPTIONS --- */}
                            {sourceType === "CHARGE" && (
                              <>
                                <SelectGroup>
                                  <SelectLabel>Room related</SelectLabel>
                                  <SelectItem value="ROOM_RENT">
                                    Room Rent
                                  </SelectItem>
                                  <SelectItem value="EARLY_CHECKIN">
                                    Early Check-in
                                  </SelectItem>
                                  <SelectItem value="LATE_CHECKOUT">
                                    Late Check-out
                                  </SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Food & Beverage</SelectLabel>
                                  <SelectItem value="FOOD_ORDER">
                                    Food Order
                                  </SelectItem>
                                  <SelectItem value="BAR_ORDER">
                                    Bar Order
                                  </SelectItem>
                                  <SelectItem value="MINIBAR">
                                    Minibar
                                  </SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Services</SelectLabel>
                                  <SelectItem value="LAUNDRY">
                                    Laundry Service
                                  </SelectItem>
                                  <SelectItem value="SPA">
                                    Spa Service
                                  </SelectItem>
                                  <SelectItem value="HOUSE_KEEPING">
                                    House Keeping
                                  </SelectItem>
                                  <SelectItem value="ROOM_SERVICE">
                                    Room Service
                                  </SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Misc</SelectLabel>
                                  <SelectItem value="DAMAGE">
                                    Damage Charge
                                  </SelectItem>
                                  <SelectItem value="SERVICE_CHARGE">
                                    Service Charge
                                  </SelectItem>
                                </SelectGroup>
                              </>
                            )}

                            {/* --- TAX OPTIONS --- */}
                            {sourceType === "TAX" && (
                              <SelectGroup>
                                <SelectLabel>Tax Types</SelectLabel>
                                <SelectItem value="CGST">CGST</SelectItem>
                                <SelectItem value="SGST">SGST</SelectItem>
                                <SelectItem value="IGST">IGST</SelectItem>
                              </SelectGroup>
                            )}

                            {/* --- PAYMENT OPTIONS --- */}
                            {sourceType === "PAYMENT" && (
                              <SelectGroup>
                                <SelectLabel>Payment Methods</SelectLabel>
                                <SelectItem value="CASH">Cash</SelectItem>
                                <SelectItem value="CARD">Card</SelectItem>
                                <SelectItem value="UPI">UPI</SelectItem>
                                <SelectItem value="BANK">Bank</SelectItem>
                              </SelectGroup>
                            )}

                            {/* --- SYSTEM / ADJ OPTIONS --- */}
                            {sourceType === "SYSTEM" && (
                              <SelectGroup>
                                <SelectLabel>System Codes</SelectLabel>
                                <SelectItem value="RECEIVABLE">
                                  Receivable
                                </SelectItem>
                                <SelectItem value="PAYABLE">Payable</SelectItem>
                                <SelectItem value="ROUNDING">
                                  Rounding
                                </SelectItem>
                              </SelectGroup>
                            )}

                            {sourceType === "ADJUSTMENT" && (
                              <SelectGroup>
                                <SelectLabel>Adjustment Codes</SelectLabel>
                                <SelectItem value="DISCOUNT">
                                  Discounts
                                </SelectItem>
                                <SelectItem value="WRITE_OFF">
                                  Write-offs
                                </SelectItem>
                              </SelectGroup>
                            )}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                )}
              />

              {/* 3. ACCOUNT ID */}
              <form.Field
                name="account_id"
                children={(field) => (
                  <Field className="flex-1">
                    <FieldLabel htmlFor={field.name}>Account ID</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </Field>
                )}
              />
            </div>

            <Field orientation="horizontal" className="pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "Saving..." : "Save Mapping"}
                  </Button>
                )}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
