import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
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
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  useCitiesOfState,
  useCountries,
  useSectorsModules,
  useSharpSectorList,
  useStateOfCountries,
} from "@/apis/Queries";
import { NewSearchableSelect } from "../NewLocationDropdown";

type Country = {
  id: string;
  name: string;
  iso2: string;
  emoji: string;
  phonecode: string;
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

export function OrgOnBoardingPage() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("");

  const { data: sectorList } = useSharpSectorList();
  const allSectors = sectorList?.data?.ORG_TYPE ?? [];

  const { data: sectorModules } = useSectorsModules(selectedSector!!);
  const allModules = sectorModules?.data?.submodules ?? [];

  // Countries data
  const { data: countryList, isFetching } = useCountries();
  const allCountryList = countryList?.data ?? [];

  const { data: stateList, isFetching: isStateFetching } = useStateOfCountries(
    country!!
  );
  const allStates = stateList?.data ?? [];

  const { data: citiesList, isPending } = useCitiesOfState(country!!, state!!);
  const allCities = citiesList?.data ?? [];

  const form = useForm({
    defaultValues: {
      sector: "",
      sectorModules: [""],
      address_line: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      super_admin_name: "",
    },
  });

  return (
    <div className=" m-2 space-y-4 max-w-7xl mx-auto">
      <div className="p-6">
        <h1>Welcome to On-Boarding to Sharpnr </h1>
        <div>
          We Promise this is best decision you have taken for your business
        </div>
      </div>
      <Card className="">
        {/* ───────── HEADER ───────── */}
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            Organization Details
          </CardTitle>
          <CardDescription>
            Review the organization information before completing onboarding
          </CardDescription>
        </CardHeader>

        {/* ───────── CONTENT ───────── */}
        <CardContent className="grid gap-6 md:grid-cols-3">
          {/* Organization Name */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Organization Name</p>
            <p className="font-medium">Acme Hospitality Pvt Ltd</p>
          </div>

          {/* Root Email */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Root Email</p>
            <p className="font-medium">admin@acme.com</p>
          </div>

          {/* Mobile */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Mobile Number</p>
            <p className="font-medium">+91 98765 43210</p>
          </div>
        </CardContent>

        {/* ───────── FOOTER ───────── */}
        <CardFooter className="border-t bg-muted/40 text-sm text-muted-foreground">
          This information will be used to configure your organization
          workspace.
        </CardFooter>
      </Card>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSeparator>Business Operations</FieldSeparator>
          <FieldSet>
            <FieldLegend>Select Business Sector</FieldLegend>
            <FieldDescription>
              select the Sector in which you Organization's operate on
            </FieldDescription>

            <FieldGroup>
              <form.Field
                name="sector"
                // listeners={}
                children={(field) => {
                  return (
                    <Field>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => {
                          field.handleChange(value);
                          const lower = value?.toLowerCase() ?? "";
                          setSelectedSector(lower);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {allSectors.map((sm: any) => (
                            <SelectItem key={sm} value={sm}>
                              {sm}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Select the Modules</FieldLegend>
            <FieldDescription>Something</FieldDescription>
            <FieldGroup>
              <form.Field name="sectorModules" mode="array">
                {(field) => {
                  const selectedValues = field.state.value ?? [];

                  return (
                    <Field>
                      <FieldLabel>Choose Appropriate Modules</FieldLabel>

                      <div className="grid gap-3 md:grid-cols-2">
                        {allModules?.map((sm: any) => {
                          const isChecked = selectedValues.includes(sm);

                          return (
                            <CheckboxCard
                              key={sm.id}
                              id={sm.id}
                              title={sm.module_name}
                              description={sm.description}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  // ➕ ADD to array
                                  field.pushValue(sm);
                                } else {
                                  // ➖ REMOVE from array
                                  field.removeValue(sm);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator>Address Details</FieldSeparator>

          <div className="flex flex-col gap-5">
            <form.Field
              name="address_line"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel>Full Address</FieldLabel>
                    <Textarea
                      placeholder="Baney vihar colony Joshi marg ...."
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            />
            <div className="grid grid-cols-2 gap-6">
              <form.Field
                name="country"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>Country</FieldLabel>
                      <NewSearchableSelect<Country>
                        value={country}
                        options={allCountryList}
                        placeholder={"select Country"}
                        getValue={(c) => c.iso2}
                        getLabel={(c) => c.name}
                        renderOption={(c) => (
                          <span className="flex items-center gap-2">
                            <span>{c.emoji}</span>
                            <span>{c.name}</span>
                          </span>
                        )}
                        onChange={(value, country) => {
                          setCountry(value);
                        }}
                      />
                    </Field>
                  );
                }}
              />

              <form.Field
                name="state"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>State</FieldLabel>
                      <NewSearchableSelect<StateShape>
                        value={state}
                        options={allStates}
                        placeholder="Select state"
                        searchPlaceholder="Search state..."
                        getValue={(state) => state.iso2}
                        getLabel={(state) => state.name}
                        onChange={(value, state) => {
                          setState(value);
                        }}
                      />
                    </Field>
                  );
                }}
              />

              <form.Field
                name="city"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>Select City</FieldLabel>
                      <NewSearchableSelect<CityShape>
                        value={field.state.value}
                        options={allCities} // Array<City>
                        placeholder="Select city"
                        searchPlaceholder="Search city..."
                        getValue={(city) => city.id}
                        getLabel={(city) => city.name}
                        onChange={(value, city) => {
                          field.handleChange(value);
                          console.log(
                            "Selected City:",
                            city.latitude,
                            city.longitude
                          );
                        }}
                      />
                    </Field>
                  );
                }}
              />

              <form.Field
                name="pincode"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>Pincode/Zipcode</FieldLabel>
                      <Input />
                    </Field>
                  );
                }}
              />
            </div>
          </div>
          <FieldGroup className="items-center">
            <Button className="w-fit">
              Continue <ArrowRight />
            </Button>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
