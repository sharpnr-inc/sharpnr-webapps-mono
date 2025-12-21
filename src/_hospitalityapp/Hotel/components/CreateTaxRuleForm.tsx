import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Plus, X, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useMutationCreateTaxRulesOfHotel } from "@/api_service/mutations/Hospitality/Hotel";

// Type definitions based on Go structs
type TaxType = "ROOM_GST";

type TaxConditionType = "PRICE_SLAB";

type TaxComponentType = "CGST" | "SGST" | "IGST";

interface CreateHotelTaxComponent {
  component_type: TaxComponentType;
  rate: number;
}

interface CreateHotelTaxRuleRequest {
  rule_name: string;
  tax_type: TaxType;
  condition_type: TaxConditionType;
  min_value: number | null;
  max_value: number | null;
  tax_rate: number;
  effective_from: string; // RFC3339 format
  effective_to: string | null; // RFC3339 format
  components: CreateHotelTaxComponent[];
}

export default function CreateTaxRuleOfHotel() {
  const [components, setComponents] = useState<CreateHotelTaxComponent[]>([
    { component_type: "CGST", rate: 0 },
    { component_type: "SGST", rate: 0 }
  ]);
  const createTaxRule = useMutationCreateTaxRulesOfHotel();

  const [effectiveFromDate, setEffectiveFromDate] = useState<Date | undefined>(undefined);
  const [effectiveToDate, setEffectiveToDate] = useState<Date | undefined>(undefined);

  const toRFC3339 = (date: Date): string => {
    return date.toISOString();
  };

  const defaultTaxRuleForm = {
    rule_name: "",
    tax_type: "ROOM_GST" as TaxType,
    condition_type: "PRICE_SLAB" as TaxConditionType,
    min_value: "",
    max_value: "",
    tax_rate: "",
    effective_from: "",
    effective_to: ""
  };

  const form = useForm({
    defaultValues: defaultTaxRuleForm,
    onSubmit: async ({ value }) => {
      // Clean the payload - convert empty strings to null for optional fields
      const payload: CreateHotelTaxRuleRequest = {
        rule_name: value.rule_name,
        tax_type: value.tax_type,
        condition_type: value.condition_type,
        min_value: value.min_value ? parseFloat(value.min_value) : null,
        max_value: value.max_value ? parseFloat(value.max_value) : null,
        tax_rate: parseFloat(value.tax_rate),
        effective_from: value.effective_from,
        effective_to: value.effective_to || null, // Convert empty string to null
        components: components.map(c => ({
          component_type: c.component_type,
          rate: c.rate
        }))
      };
      
      console.log("Form submitted:", JSON.stringify(payload, null, 2));
      createTaxRule.mutate(payload);
    }
  });

  const addComponent = () => {
    if (components.length < 3) {
      const usedTypes = components.map(c => c.component_type);
      const availableTypes: TaxComponentType[] = ["CGST", "SGST", "IGST"];
      const availableType = availableTypes.find(t => !usedTypes.includes(t));
      if (availableType) {
        setComponents([...components, { component_type: availableType, rate: 0 }]);
      }
    }
  };

  const removeComponent = (index: number) => {
    if (components.length > 2) {
      setComponents(components.filter((_, i) => i !== index));
    }
  };

  const updateComponent = (index: number, field: keyof CreateHotelTaxComponent, value: TaxComponentType | number) => {
    const updated = [...components];
    if (field === "component_type") {
      updated[index][field] = value as TaxComponentType;
    } else if (field === "rate") {
      updated[index][field] = value as number;
    }
    setComponents(updated);
  };

  const getAvailableComponentTypes = (currentType: TaxComponentType): TaxComponentType[] => {
    const usedTypes = components.map(c => c.component_type).filter(t => t !== currentType);
    const allTypes: TaxComponentType[] = ["CGST", "SGST", "IGST"];
    return allTypes.filter(t => !usedTypes.includes(t));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="">
      <div className="mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Hotel Tax Rule</CardTitle>
            <CardDescription>Configure GST tax rules for room bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <form.Field name="rule_name">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="ruleName">
                      Rule Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="ruleName"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g., Room GST 18%"
                      required
                    />
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="tax_type">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="taxType">
                        Tax Type <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="taxType"
                        type="text"
                        value={field.state.value}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="condition_type">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="conditionType">
                        Condition Type <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="conditionType"
                        type="text"
                        value={field.state.value}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="min_value">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="minValue">Minimum Value</Label>
                      <Input
                        id="minValue"
                        type="number"
                        step="0.01"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., 7500"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="max_value">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="maxValue">Maximum Value</Label>
                      <Input
                        id="maxValue"
                        type="number"
                        step="0.01"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              <form.Field name="tax_rate">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">
                      Tax Rate (%) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.01"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g., 18"
                      required
                    />
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="effective_from">
                  {(field) => (
                    <div className="space-y-2">
                      <Label>
                        Effective From <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {effectiveFromDate ? (
                              format(effectiveFromDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={effectiveFromDate}
                            onSelect={(date) => {
                              if (date) {
                                setEffectiveFromDate(date);
                                field.handleChange(toRFC3339(date));
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </form.Field>

                <form.Field name="effective_to">
                  {(field) => (
                    <div className="space-y-2">
                      <Label>Effective To</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {effectiveToDate ? (
                              format(effectiveToDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={effectiveToDate}
                            onSelect={(date) => {
                              if (date) {
                                setEffectiveToDate(date);
                                field.handleChange(toRFC3339(date));
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>
                    Tax Components <span className="text-red-500">*</span>
                    <span className="text-muted-foreground text-xs ml-2">(Min: 2, Max: 3)</span>
                  </Label>
                  {components.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addComponent}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Component
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {components.map((component, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex gap-3 items-start">
                          <div className="flex-1 space-y-2">
                            <Label>Component Type</Label>
                            <Select
                              value={component.component_type}
                              onValueChange={(value: TaxComponentType) => updateComponent(index, "component_type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableComponentTypes(component.component_type).map(type => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-1 space-y-2">
                            <Label>Rate (%)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={component.rate}
                              onChange={(e) => updateComponent(index, "rate", parseFloat(e.target.value) || 0)}
                              placeholder="Rate (%)"
                              required
                            />
                          </div>
                          {components.length > 2 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeComponent(index)}
                              className="mt-8"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1"
                >
                  Create Tax Rule
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setEffectiveFromDate(undefined);
                    setEffectiveToDate(undefined);
                    setComponents([
                      { component_type: "CGST", rate: 0 },
                      { component_type: "SGST", rate: 0 }
                    ]);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}