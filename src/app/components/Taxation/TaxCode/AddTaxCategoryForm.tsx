import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppForm } from "@/components/forms";
import type { AddTaxCategoryPayload } from "@/_orchestrator/legal_entity/api/legalEntity.api.service";
import { useAccountingStore } from "@/app/store/accounting.store";
import { useLEAccountingBook } from "../../../api/queries/books";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLegalEntityAllTaxRegistration } from "@/_orchestrator/legal_entity/api/legalEntity.api.queries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { useADDTaxCategoryOrCode } from "@/_orchestrator/legal_entity/api/legalEntity.api.mutation";
import { useQueryClient } from "@tanstack/react-query";

interface AddTaxCategoryProps {
  legalEntityID?: string;
  closeModal: () => void;
}

export function AddTaxCategoryForm({ closeModal }: AddTaxCategoryProps) {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data } = useLEAccountingBook(selectedLegalEntity?.id);
  const { data: taxRegistration } = useLegalEntityAllTaxRegistration(
    selectedLegalEntity?.id,
  );

  const q = useQueryClient();

  const { mutateAsync } = useADDTaxCategoryOrCode();

  const defaultTaxCategory: AddTaxCategoryPayload = {
    accounting_book_id: data?.data?.id,
    category_name: "",
    code: "",
    legal_entity_id: selectedLegalEntity?.id,
    income_account_id: "",
    receivable_account_id: "",
    rule: {
      effective_from: "",
      effective_to: "",
      tax_type: "",
      legal_entity_tax_registration_id: "",
      rate: 0.0,
      max_value: 0,
      min_value: 0,
      components: [
        {
          component_code: "",
          liability_account_id: "",
          rate: 0.0,
        },
      ],
    },
  };

  const form = useAppForm({
    defaultValues: defaultTaxCategory,
    onSubmit: async ({ value }) => {
      const payload: AddTaxCategoryPayload = {
        ...value,
        legal_entity_id: selectedLegalEntity?.id,

        rule: {
          ...value.rule,

          effective_from: value.rule.effective_from
            ? new Date(value.rule.effective_from).toISOString()
            : "",

          effective_to: value.rule.effective_to
            ? new Date(value.rule.effective_to).toISOString()
            : undefined,

          rate: Number(value.rule.rate),
          max_value: Number(value.rule.max_value),
          min_value: Number(value.rule.min_value),

          components: value.rule.components.map((c) => ({
            ...c,
            rate: Number(c.rate),
          })),
        },
      };
      await mutateAsync(
        {
          legalEntityID: selectedLegalEntity?.id,
          payload,
        },
        {
          onSuccess: () => {
            q.invalidateQueries({
              queryKey: ["LEAGAL_ENTITY", "TAX_CATEGORY", "ALL"],
            });
            closeModal();
          },
        },
      );
    },
  });
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* ── Section 1: Category Identity ── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Tax Category</CardTitle>
              <CardDescription className="text-sm mt-0.5">
                Basic identification details for this tax category
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-mono">
              New
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <form.AppField
                name="category_name"
                children={(f) => <f.TextField label="Category Name" />}
              />
            </div>

            <div className="md:col-span-1">
              <form.AppField
                name="code"
                children={(f) => (
                  <f.TextField label="Category Code" uppercase />
                )}
              />
            </div>

            <div className="md:col-span-1">
              <form.AppField name="receivable_account_id">
                {(f) => {
                  const accountGroups =
                    data?.data?.groups?.map((group: any) => ({
                      label: group.group_name,
                      accounts: group.accounts,
                    })) ?? [];

                  return (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Recievable Account
                      </label>
                      <Select
                        value={f.state.value}
                        onValueChange={(value) => f.handleChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account…" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountGroups.map((group: any) => (
                            <SelectGroup key={group.label}>
                              <SelectLabel>{group.label}</SelectLabel>
                              {group.accounts.map((acc: any) => (
                                <SelectItem key={acc.id} value={acc.id}>
                                  {acc.account_name}{" "}
                                  <span className="text-muted-foreground font-mono text-xs">
                                    ({acc.code})
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                      {f.state.meta.errors?.[0] && (
                        <p className="text-xs text-destructive">
                          Please select an income account
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.AppField>
            </div>
            <div className="md:col-span-1">
              <form.AppField name="income_account_id">
                {(f) => {
                  const accountGroups =
                    data?.data?.groups?.map((group: any) => ({
                      label: group.group_name,
                      accounts: group.accounts,
                    })) ?? [];

                  return (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Income Account
                      </label>
                      <Select
                        value={f.state.value}
                        onValueChange={(value) => f.handleChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account…" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountGroups.map((group: any) => (
                            <SelectGroup key={group.label}>
                              <SelectLabel>{group.label}</SelectLabel>
                              {group.accounts.map((acc: any) => (
                                <SelectItem key={acc.id} value={acc.id}>
                                  {acc.account_name}{" "}
                                  <span className="text-muted-foreground font-mono text-xs">
                                    ({acc.code})
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                      {f.state.meta.errors?.[0] && (
                        <p className="text-xs text-destructive">
                          Please select an income account
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.AppField>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section 2: Tax Rule ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tax Rule</CardTitle>
          <CardDescription className="text-sm mt-0.5">
            Define the rule parameters that govern this tax category
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-5 space-y-6">
          {/* Validity Period */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Validity Period
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.AppField
                name="rule.effective_from"
                children={(f) => (
                  <f.TextField label="Effective From" type="date" />
                )}
              />
              <form.AppField
                name="rule.effective_to"
                children={(f) => (
                  <f.TextField label="Effective To (Optional)" type="date" />
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Value Thresholds */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Value Thresholds
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.AppField
                name="rule.min_value"
                children={(f) => (
                  <f.TextField label="Minimum Value" type="number" />
                )}
              />
              <form.AppField
                name="rule.max_value"
                children={(f) => (
                  <f.TextField label="Maximum Value" type="number" />
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Rate & Registration */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Rate & Registration
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form.AppField
                name="rule.rate"
                children={(f) => (
                  <f.TextField label="Tax Rate (%)" type="number" />
                )}
              />
              <form.AppField
                name="rule.tax_type"
                children={(f) => <f.TextField label="Tax Type" />}
              />
              <form.AppField name="rule.legal_entity_tax_registration_id">
                {(f) => {
                  const registrations = taxRegistration?.data ?? [];
                  return (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Tax Registration
                      </label>
                      <Select
                        value={f.state.value}
                        onValueChange={(value) => f.handleChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select registration…" />
                        </SelectTrigger>
                        <SelectContent>
                          {registrations.map((reg: any) => (
                            <SelectItem key={reg.id} value={reg.id}>
                              {reg.tax_type} — {reg.registration_number}{" "}
                              <span className="text-muted-foreground text-xs">
                                ({reg.state})
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {f.state.meta.errors?.[0] && (
                        <p className="text-xs text-destructive">
                          {f.state.meta.errors}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.AppField>
            </div>
          </div>

          <Separator />

          {/* Tax Components */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Tax Components
            </p>

            <form.Field name="rule.components" mode="array">
              {(componentsField) => {
                const accountGroups =
                  data?.data?.groups?.map((group: any) => ({
                    label: group.group_name,
                    accounts: group.accounts,
                  })) ?? [];

                return (
                  <div className="space-y-3">
                    {componentsField.state.value.map((_, i) => (
                      <div
                        key={i}
                        className="rounded-lg border bg-muted/30 p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-muted-foreground">
                            Component {i + 1}
                          </span>
                          {i > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => componentsField.removeValue(i)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <form.AppField
                            name={`rule.components[${i}].component_code`}
                          >
                            {(f) => (
                              <f.TextField label="Component Code" uppercase />
                            )}
                          </form.AppField>

                          <form.AppField name={`rule.components[${i}].rate`}>
                            {(f) => (
                              <f.TextField label="Rate (%)" type="number" />
                            )}
                          </form.AppField>

                          <form.AppField
                            name={`rule.components[${i}].liability_account_id`}
                          >
                            {(f) => (
                              <div className="space-y-1.5">
                                <label className="text-sm font-medium leading-none">
                                  Liability Account
                                </label>
                                <Select
                                  value={f.state.value}
                                  onValueChange={(value) =>
                                    f.handleChange(value)
                                  }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select account…" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {accountGroups.map((group: any) => (
                                      <SelectGroup key={group.label}>
                                        <SelectLabel>{group.label}</SelectLabel>
                                        {group.accounts.map((acc: any) => (
                                          <SelectItem
                                            key={acc.id}
                                            value={acc.id}
                                          >
                                            {acc.account_name}{" "}
                                            <span className="text-muted-foreground font-mono text-xs">
                                              ({acc.code})
                                            </span>
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </form.AppField>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 border-dashed"
                      onClick={() =>
                        componentsField.pushValue({
                          component_code: "",
                          rate: 0,
                          liability_account_id: "",
                        })
                      }
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Component
                    </Button>
                  </div>
                );
              }}
            </form.Field>
          </div>
        </CardContent>
      </Card>

      {/* ── Footer ── */}
      <div className="flex justify-end">
        <form.AppForm>
          <form.SubmitButton>Add Tax Category</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
