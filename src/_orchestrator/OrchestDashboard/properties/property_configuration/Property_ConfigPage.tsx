import { useSharpSectorList } from "@/apis/Queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { useSearch } from "@tanstack/react-router";
import { useAddPropertyDomainMutation } from "../../api/mutations/property_mutation";
import { Button } from "@/components/ui/button";
import { PlaneIcon } from "lucide-react";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property-configuration";
import { ModulesSelectionSection } from "./ModulesSelection";
import { usePropertyDetails } from "../../api/queries/general";

export function PropertyConfigurationPage() {
  const { propertyId } = Route.useParams();
  const searchParams = useSearch({
    from: "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property-configuration",
  });

  const { data: propertyDetails, isLoading } = usePropertyDetails(propertyId);

  const property = propertyDetails?.data;

  const hasDomain = !!property?.Domain && property.Domain.trim() !== "";

  const { data } = useSharpSectorList();
  const orgTypes = data?.data?.ORG_TYPE ?? [];

  const addDomain = useAddPropertyDomainMutation();

  const form = useForm({
    defaultValues: {
      domain: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await addDomain.mutateAsync({
        domain: value.domain,
        propertyID: propertyId,
      });
    },
  });

  return (
    <div className="p-2 space-y-4">
      <h1>Configure</h1>
      <div className="text-xl font-semibold">{searchParams.p_name}</div>

      {/* Show ONLY when domain is missing */}
      {!hasDomain && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Add Domain</CardTitle>
              <CardDescription>
                First add the property domain. Domain decides what type of
                business you are in, and based on that we enable modules.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form.Field
                name="domain"
                children={(field) => (
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="w-[260px]">
                      <SelectValue placeholder="Select business domain" />
                    </SelectTrigger>

                    <SelectContent>
                      {orgTypes.map((type: string) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </CardContent>

            <CardFooter>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting}>
                    <PlaneIcon />
                    {isSubmitting ? "Configuring..." : "Add Domain"}
                  </Button>
                )}
              </form.Subscribe>
            </CardFooter>
          </Card>
        </form>
      )}

      {/* Show ONLY when domain exists */}
      {hasDomain && (
        <ModulesSelectionSection
          domain={property?.Domain}
          propertyID={propertyId}
        />
      )}
    </div>
  );
}
