import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckboxCard } from "./checkboxCard";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Building2,
  Loader2,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import {
  useCitiesOfState,
  useCountries,
  useSectorsModules,
  useSharpSectorList,
  useStateOfCountries,
} from "@/apis/Queries";
import { NewSearchableSelect } from "../NewLocationDropdown";
import type { OrgOnBoardingPayload } from "@/apis/api_service";
import { Route } from "@/routes/org-signup/on-boarding";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useOrgOnBoardingMutation } from "@/apis/mutation";

type Country = {
  id: string;
  name: string;
  iso2: string;
  emoji: string;
};

export type StateShape = {
  id: string;
  iso2: string;
  name: string;
};

export type CityShape = {
  id: string;
  latitude: string;
  longitude: string;
  name: string;
};

// Fixed animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

export function OrgOnBoardingPage() {
  const navigate = useNavigate();

  const startOnBoarding = useOrgOnBoardingMutation();

  const { stagingOrg } = Route.useRouteContext();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("");

  const { data: sectorList } = useSharpSectorList();
  const allSectors = sectorList?.data?.ORG_TYPE ?? [];

  const { data: sectorModules, isLoading: isModulesLoading } =
    useSectorsModules(selectedSector!!);
  const allModules = sectorModules?.data?.submodules ?? [];

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
      console.log(value)
      await startOnBoarding.mutateAsync(value, {
        onSuccess: () => {
          navigate({ to: "/dashboard" });
        },
      });
    },
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
          >
            <Building2 className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome to Sharpnr
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We promise this is the best decision you've taken for your business.
            Let's get you set up in just a few steps.
          </p>
        </motion.div>

        {/* Organization Details Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Organization Details
              </CardTitle>
              <CardDescription>
                Review your organization information before completing
                onboarding
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 sm:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-1 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <p className="text-sm text-muted-foreground">
                  Organization Name
                </p>
                <p className="font-semibold">{stagingOrg?.Org?.org_name}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-1 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <p className="text-sm text-muted-foreground">Root Email</p>
                <p className="font-semibold break-all">
                  {stagingOrg?.Org?.org_email}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-1 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <p className="text-sm text-muted-foreground">Mobile Number</p>
                <p className="font-semibold">{stagingOrg?.Org?.org_phone}</p>
              </motion.div>
            </CardContent>

            <CardFooter className="border-t bg-muted/40 text-sm text-muted-foreground">
              💡 This information will be used to configure your organization
              workspace
            </CardFooter>
          </Card>
        </motion.div>

        {/* Onboarding Form */}
        <motion.div variants={itemVariants}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* Business Operations Section */}
            <Card className="border-2 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-lg">Business Operations</CardTitle>
                <CardDescription>
                  Tell us about your business sector and modules
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Sector Selection */}
                <FieldSet>
                  <FieldLegend className="text-base font-semibold">
                    Select Business Sector
                  </FieldLegend>
                  <FieldDescription>
                    Choose the sector your organization operates in
                  </FieldDescription>

                  <form.Field
                    name="org_sector"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "Please select a business sector" : undefined,
                    }}
                    children={(field) => (
                      <Field>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(value);
                            const lower = value?.toLowerCase() ?? "";
                            setSelectedSector(lower);
                          }}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your business sector" />
                          </SelectTrigger>
                          <SelectContent>
                            {allSectors.map((sm: any) => (
                              <SelectItem key={sm} value={sm}>
                                {sm}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <FieldError>
                              {field.state.meta.errors[0]}
                            </FieldError>
                          )}
                      </Field>
                    )}
                  />
                </FieldSet>

                {/* Modules Selection */}
                {selectedSector && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FieldSet>
                      <FieldLegend className="text-base font-semibold">
                        Select Modules
                      </FieldLegend>
                      <FieldDescription>
                        Choose the modules you need for your business
                      </FieldDescription>

                      {isModulesLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <span className="ml-2 text-muted-foreground">
                            Loading modules...
                          </span>
                        </div>
                      ) : allModules.length === 0 ? (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No modules available for this sector
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <form.Field
                          name="org_sector_modules"
                          mode="array"
                          validators={{
                            onChange: ({ value }) =>
                              !value || value.length === 0
                                ? "Please select at least one module"
                                : undefined,
                          }}
                        >
                          {(field) => {
                            const selectedValues = field.state.value ?? [];

                            return (
                              <Field>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  {allModules?.map((sm: any, index: number) => {
                                    const isChecked = selectedValues.includes(
                                      sm.module_name
                                    );

                                    return (
                                      <motion.div
                                        key={sm.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                      >
                                        <CheckboxCard
                                          id={sm.id}
                                          title={sm.module_name}
                                          description={sm.description}
                                          checked={isChecked}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              field.pushValue(sm.module_name);
                                            } else {
                                              field.removeValue(sm.module_name);
                                            }
                                          }}
                                        />
                                      </motion.div>
                                    );
                                  })}
                                </div>
                                {field.state.meta.isTouched &&
                                  field.state.meta.errors.length > 0 && (
                                    <FieldError>
                                      {field.state.meta.errors[0]}
                                    </FieldError>
                                  )}
                              </Field>
                            );
                          }}
                        </form.Field>
                      )}
                    </FieldSet>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Address Details Section */}
            <Card className="border-2 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Address Details
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
                            <FieldError>
                              {field.state.meta.errors[0]}
                            </FieldError>
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
                              isStateFetching
                                ? "Loading states..."
                                : "Select state"
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
                            <FieldError>
                              {field.state.meta.errors[0]}
                            </FieldError>
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
                              isCityPending
                                ? "Loading cities..."
                                : "Select city"
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
                            <FieldError>
                              {field.state.meta.errors[0]}
                            </FieldError>
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
                            <FieldError>
                              {field.state.meta.errors[0]}
                            </FieldError>
                          )}
                      </Field>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <motion.div
                  whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                  whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                >
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Setting up your workspace...
                      </>
                    ) : (
                      <>
                        Complete Onboarding
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            />
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
