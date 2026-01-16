import type { OrgOnBoardingPayload } from "@/apis/api_service";
import { useOrgOnBoardingMutation } from "@/apis/mutation";
import {
  useCitiesOfState,
  useCountries,
  useStateOfCountries,
} from "@/apis/Queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewSearchableSelect } from "@/signup/NewLocationDropdown";
import type {
  CityShape,
  StateShape,
} from "@/signup/on-boarding/OnBoradingPage";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useState } from "react";

export function OrchestratorHQSetup() {
  const navigate = useNavigate();
  const startOnBoarding = useOrgOnBoardingMutation();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  type Country = {
    id: string;
    name: string;
    iso2: string;
    emoji: string;
  };
  // Countries data with loading/error states
  const {
    data: countryList,
    isFetching: isCountryFetching,
    isError: isCountryError,
  } = useCountries();
  const allCountryList = countryList?.data ?? [];

  const {
    data: stateList,
    isFetching: isStateFetching,
    isError: isStateError,
  } = useStateOfCountries(country!!);
  const allStates = stateList?.data ?? [];

  const {
    data: citiesList,
    isPending: isCityPending,
    isError: isCityError,
  } = useCitiesOfState(country!!, state!!);
  const allCities = citiesList?.data ?? [];

  const defaultOnBoardingVal: OrgOnBoardingPayload = {
    org_address_line: "",
    org_city: "",
    org_country: "",
    org_pincode: "",
    org_sector: "",
    org_sector_modules: [],
    org_state: "",
  };

  const form = useForm({
    defaultValues: defaultOnBoardingVal,
    onSubmit: async ({ value }) => {
      console.log(value);
      await startOnBoarding.mutateAsync(value, {
        onSuccess: () => {
          navigate({ to: "/dashboard" });
        },
      });
    },
  });
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Organization setup</CardTitle>
          <CardDescription>
            First we setup the Organization/Orchestrator this is you Sharpnr
            Accounts think of this as the control pane or command center
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Organization Name */}
            <div>
              <p className="text-xs text-muted-foreground">Organization</p>
              <p className="font-medium">XYZ Pvt Ltd</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs text-muted-foreground">Primary Email</p>
              <div className="flex items-center gap-2">
                <span className="font-medium">somecompany101@example.com</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs text-muted-foreground">Contact Number</p>
              <p className="font-medium">+91 98288 23314</p>
            </div>
          </div>

          {/* Address Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t pt-4">
            {/* Address Line */}
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>

            {/* City */}
            <div>
              <p className="text-xs text-muted-foreground">City</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>

            {/* State */}
            <div>
              <p className="text-xs text-muted-foreground">State</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>

            {/* Country */}
            <div>
              <p className="text-xs text-muted-foreground">Country</p>
              <p className="font-medium text-muted-foreground">N/A</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <form>
        <Card className="border-2 shadow-lg overflow-hidden">
          <CardHeader className="">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Organization Office details
            </CardTitle>
            <CardDescription>
              Provide your organization's address information
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Full Address */}
            <form.Field
              name="org_address_line"
              validators={{
                onChange: ({ value }) =>
                  !value || value.length < 10
                    ? "Address must be at least 10 characters"
                    : undefined,
              }}
              children={(field) => (
                <Field>
                  <FieldLabel>Full Address</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    placeholder="Enter your complete address (e.g., Baney Vihar Colony, Joshi Marg...)"
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="min-h-[100px] resize-none"
                  />
                  <FieldDescription>
                    Include street, building number, and any landmarks
                  </FieldDescription>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <FieldError>{field.state.meta.errors[0]}</FieldError>
                    )}
                </Field>
              )}
            />

            {/* Location Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Country */}
              <form.Field
                name="org_country"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Please select a country" : undefined,
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel>Country</FieldLabel>
                    {isCountryError ? (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Failed to load countries. Please refresh the page.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <NewSearchableSelect<Country>
                        value={country}
                        options={allCountryList}
                        placeholder={
                          isCountryFetching
                            ? "Loading countries..."
                            : "Select country"
                        }
                        getValue={(c) => c.iso2}
                        getLabel={(c) => c.name}
                        getMainValue={(c) => c.name}
                        renderOption={(c) => (
                          <span className="flex items-center gap-2">
                            <span>{c.emoji}</span>
                            <span>{c.name}</span>
                          </span>
                        )}
                        onChange={(value, country, c) => {
                          setCountry(value);

                          field.handleChange(c);

                          setState("");
                          form.setFieldValue("org_state", "");
                          form.setFieldValue("org_city", "");
                        }}
                        disabled={isCountryFetching}
                      />
                    )}
                    {isCountryFetching && (
                      <FieldDescription>
                        <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                        Loading countries...
                      </FieldDescription>
                    )}
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <FieldError>{field.state.meta.errors[0]}</FieldError>
                      )}
                  </Field>
                )}
              />

              {/* State */}
              <form.Field
                name="org_state"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Please select a state" : undefined,
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel>State</FieldLabel>
                    {isStateError ? (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Failed to load states. Please select a different
                          country.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <NewSearchableSelect<StateShape>
                        value={state}
                        options={allStates}
                        placeholder={
                          isStateFetching ? "Loading states..." : "Select state"
                        }
                        searchPlaceholder="Search state..."
                        getValue={(state) => state.iso2}
                        getLabel={(state) => state.name}
                        getMainValue={(c) => c.name}
                        onChange={(value, stateData, c) => {
                          setState(value);
                          field.handleChange(c);
                          form.setFieldValue("org_city", "");
                        }}
                        disabled={!country || isStateFetching}
                      />
                    )}
                    {isStateFetching && country && (
                      <FieldDescription>
                        <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                        Loading states...
                      </FieldDescription>
                    )}
                    {!country && (
                      <FieldDescription>
                        Please select a country first
                      </FieldDescription>
                    )}
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <FieldError>{field.state.meta.errors[0]}</FieldError>
                      )}
                  </Field>
                )}
              />

              {/* City */}
              <form.Field
                name="org_city"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Please select a city" : undefined,
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel>City</FieldLabel>
                    {isCityError ? (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Failed to load cities. Please select a different
                          state.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <NewSearchableSelect<CityShape>
                        value={field.state.value}
                        options={allCities}
                        placeholder={
                          isCityPending ? "Loading cities..." : "Select city"
                        }
                        searchPlaceholder="Search city..."
                        getValue={(city) => city.id}
                        getLabel={(city) => city.name}
                        getMainValue={(c) => c.name}
                        onChange={(value, city, c) => {
                          field.handleChange(c);
                          console.log(
                            "Selected City:",
                            city.latitude,
                            city.longitude
                          );
                        }}
                        disabled={!state || isCityPending}
                      />
                    )}
                    {isCityPending && state && (
                      <FieldDescription>
                        <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                        Loading cities...
                      </FieldDescription>
                    )}
                    {!state && (
                      <FieldDescription>
                        Please select a state first
                      </FieldDescription>
                    )}
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <FieldError>{field.state.meta.errors[0]}</FieldError>
                      )}
                  </Field>
                )}
              />

              {/* Pincode */}
              <form.Field
                name="org_pincode"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Pincode is required";
                    if (!/^\d{5,6}$/.test(value))
                      return "Enter a valid 5-6 digit pincode";
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel>Pincode/Zipcode</FieldLabel>
                    <Input
                      value={field.state.value}
                      placeholder="Enter pincode"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      maxLength={6}
                    />
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <FieldError>{field.state.meta.errors[0]}</FieldError>
                      )}
                  </Field>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
