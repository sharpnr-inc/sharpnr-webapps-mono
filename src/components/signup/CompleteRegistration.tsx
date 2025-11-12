import { Checkbox } from "../ui/checkbox";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { Info, Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import createGetSubModuleQuery from "@/api_service/queries/fetch_subModules";
import TermsAndConditionsCard from "../ui/TermsandConditionCard";
import { Input } from "../ui/input";

import {
  createCitiesQuery,
  createCountriesQuery,
  createStatesQuery,
} from "@/api_service/queries/fetchstateandcities";
import SearchableSelect from "./searchable";

import { useState } from "react";
import { Button } from "../ui/button";
import type { OrgOwnerDetails } from "@/schemas/Auth";
import { useCompleteOrganization } from "@/api_service/mutations/Auth/completeResgistration";

const orgBasicDetails = [
  {
    label: "Root Email / Org Super Admin Email",
    value: "Kashifsocl@gmail.com",
  },
  { label: "Organization Business Operation Type", value: "HOTEL" },
  { label: "Organization Mobile", value: "+91 9876543210" },
  { label: "Organization Name", value: "SharpNR Pvt. Ltd." },
];

export default function CompleteRegistration() {
  const compeleteOrgReg = useCompleteOrganization();
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");
  const [ownerDetail, setOwnerDetails] = useState<OrgOwnerDetails[]>([]);
  const subModules = useQuery(createGetSubModuleQuery("hospitality"));
  const countryList = useQuery(createCountriesQuery());
  const stateList = useQuery({
    ...createStatesQuery(selectedCountryCode),
    enabled: !!selectedCountryCode,
  });

  const cityList = useQuery({
    ...createCitiesQuery(selectedCountryCode, selectedStateCode),
    enabled: !!selectedCountryCode,
  });

  const form = useForm({
    defaultValues: {
      address_details: {
        country: "",
        city: "",
        state: "",
        pincode: "",
        address_line: "",
        landmark: "",
      },
      is_owner: true,
      owner_details: [{ owner_name: "", owner_email: "", owner_phone: "" }],
      org_submodule_config: [] as string[],
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      compeleteOrgReg.mutate(value);
    },
  });

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Complete Company Registration</h1>
          <p className="text-gray-500 mt-2">
            Provide your organization details to complete the registration
          </p>
        </div>

        {/* Basic Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Details</CardTitle>
            <CardDescription className="text-xs">
              Organization information at a glance
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {orgBasicDetails.map((detail, i) => (
                <div key={i} className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">
                    {detail.label}
                  </Label>
                  <div className="text-sm font-medium">{detail.value}</div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="bg-muted/50 flex gap-2 text-muted-foreground px-4">
            <Info className="h-3 w-3" />
            <small>Basic company information (cannot be edited here)</small>
          </CardFooter>
        </Card>

        {/* Main Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Submodules */}
          <Card>
            <CardHeader>
              <CardTitle>Select Operations</CardTitle>
              <CardDescription>
                Choose the modules that apply to your organization
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form.Field name="org_submodule_config">
                {(field) => {
                  const value = field.state.value || [];

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {subModules.data?.data?.submodules?.map((item: any) => {
                        const checked = value.includes(item.module_name);

                        return (
                          <div
                            key={item.id}
                            className={`flex items-start gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all
                  hover:scale-[1.02] hover:shadow-lg ${
                    checked
                      ? "bg-accent text-accent-foreground border-accent"
                      : "hover:bg-muted/40"
                  }`}
                          >
                            <Checkbox
                              id={item.id}
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                if (isChecked) {
                                  field.handleChange([
                                    ...value,
                                    item.module_name,
                                  ]);
                                } else {
                                  field.handleChange(
                                    value.filter((v) => v !== item.module_name)
                                  );
                                }
                              }}
                            />
                            <div className="space-y-1">
                              <Label
                                htmlFor={item.id}
                                className="font-medium text-sm"
                              >
                                {item.module_name}
                              </Label>
                              <p className="text-xs text-muted-foreground leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization Address</CardTitle>
              <CardDescription>
                Add you Organization Address Details
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <form.Field
                name="address_details.address_line"
                validators={{
                  onChange: ({ value, fieldApi }) => {
                    // ✅ Access entire form
                    const orgModules = fieldApi.form.getFieldValue(
                      "org_submodule_config"
                    );

                    console.log("Address Value:", value);
                    console.log("Org Submodules:", orgModules);

                    if (orgModules?.includes("HOTEL") && value.length < 10) {
                      return "For HOTEL module, address must be at least 10 characters long";
                    }

                    return undefined;
                  },
                  onChangeListenTo: ["org_submodule_config"],
                }}
                children={(field) => {
                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Address Line</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder={"eg: Joshi marg, 200ft Road"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors && (
                        <p className="text-red-500 text-sm">
                          {field.state.meta.errors}
                        </p>
                      )}
                    </div>
                  );
                }}
              />

              <form.Field
                name="address_details.landmark"
                children={(field) => {
                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>LandMark</Label>
                      <Input
                        value={field.state.value}
                        id={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  );
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field
                  name="address_details.country"
                  children={(field) => {
                    return (
                      <SearchableSelect
                        label="Country"
                        placeholder="Select Country"
                        searchPlaceholder="Type to filter countries..."
                        value={field.state.value}
                        onChange={(value: any) => {
                          field.handleChange(value);

                          // Find and set country code for state query
                          const selectedCountry = countryList.data?.data?.find(
                            (c: any) => c.name === value
                          );
                          setSelectedCountryCode(selectedCountry?.iso2 || "");

                          // Reset state when country changes
                          form.setFieldValue("address_details.state", "");
                        }}
                        options={
                          countryList.data?.data?.map((c: any) => ({
                            label: c.name,
                            value: c.name,
                            icon: c.emoji,
                          })) || []
                        }
                      />
                    );
                  }}
                />

                <form.Field name="address_details.state">
                  {(field) => {
                    const currentValue = field.state?.value;

                    return (
                      <SearchableSelect
                        label="State"
                        placeholder={
                          currentValue ? "Select State" : "Select country first"
                        }
                        searchPlaceholder="Type to filter states..."
                        value={currentValue}
                        onChange={(value: any) => {
                          field.handleChange(value);
                          // Find and set country code for state query
                          const selectedState = stateList.data?.data?.find(
                            (c: any) => c.name === value
                          );
                          setSelectedStateCode(selectedState?.iso2 || "");

                          // Reset state when country changes
                          form.setFieldValue("address_details.city", "");
                        }}
                        disabled={!selectedCountryCode || stateList.isLoading}
                        options={
                          stateList?.data?.data?.map((s: any) => ({
                            label: s.name,
                            value: s.name,
                          })) || []
                        }
                      />
                    );
                  }}
                </form.Field>

                <form.Field
                  name="address_details.city"
                  children={(field) => {
                    const currentValue = field.state?.value;
                    return (
                      <SearchableSelect
                        label="City"
                        placeholder={
                          currentValue ? "Select City" : "Select State first"
                        }
                        searchPlaceholder="Type to filter states..."
                        value={currentValue}
                        onChange={field.handleChange}
                        disabled={
                          (!selectedCountryCode && !selectedStateCode) ||
                          stateList.isLoading
                        }
                        options={
                          cityList?.data?.data?.map((s: any) => ({
                            label: s.name,
                            value: s.name,
                          })) || []
                        }
                      />
                    );
                  }}
                />

                <form.Field
                  name="address_details.pincode"
                  children={(field) => {
                    return (
                      <div className="space-y-2">
                        <Label>Pincode/Zipcode</Label>
                        <Input
                          placeholder="eg: 302012"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Are you the owner of the organization?</CardTitle>
            </CardHeader>

            <CardContent>
              <form.Field name="is_owner">
                {(field) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={!!field.state.value} // ✅ ensure it's a boolean
                      onCheckedChange={(checked) =>
                        field.handleChange(!!checked)
                      } // ✅ update form value
                    />
                    <Label htmlFor="is_owner">Yes</Label>
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>

          <form.Subscribe
            selector={(state) => ({
              isOwner: state.values.is_owner, // 👈 subscribe to another field
            })}
          >
            {({ isOwner }) =>
              !isOwner && ( // 👈 conditionally render the card
                <Card>
                  <CardHeader>
                    <CardTitle>Owner's Details</CardTitle>
                    <CardDescription>
                      Add at least one owner name
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <form.Field name="owner_details">
                      {(field) => {
                        const owners = field.state?.value || ownerDetail;

                        return (
                          <>
                            {owners.map((o: OrgOwnerDetails, index: number) => (
                              <div
                                key={index}
                                className="flex gap-2 items-center"
                              >
                                <Input
                                  value={o.owner_name}
                                  onChange={(e) => {
                                    const updated = [...owners];
                                    updated[index].owner_name = e.target.value;
                                    setOwnerDetails(updated);
                                    field.handleChange(updated);
                                  }}
                                  placeholder="Owner Name"
                                />
                                <Input
                                  value={o.owner_email || ""}
                                  onChange={(e) => {
                                    const updated = [...owners];
                                    updated[index].owner_email = e.target.value;
                                    setOwnerDetails(updated);
                                    field.handleChange(updated);
                                  }}
                                  placeholder="Owner Email"
                                />
                                <Input
                                  value={o.owner_phone || ""}
                                  onChange={(e) => {
                                    const updated = [...owners];
                                    updated[index].owner_phone = e.target.value;
                                    setOwnerDetails(updated);
                                    field.handleChange(updated);
                                  }}
                                  placeholder="Owner email"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  className="h-full"
                                  onClick={() => {
                                    const updated = owners.filter(
                                      (_, i) => i !== index
                                    );
                                    setOwnerDetails(updated);
                                    field.handleChange(updated);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}

                            <Button
                              type="button"
                              variant="secondary"
                              className="mt-2"
                              onClick={() => {
                                const updated = [
                                  ...owners,
                                  {
                                    owner_name: "",
                                    owner_email: "",
                                    owner_phone: "",
                                  },
                                ];
                                setOwnerDetails(updated);
                                field.handleChange(updated);
                              }}
                            >
                              <Plus className="w-4 h-4 mr-1" /> Add Owner
                            </Button>
                          </>
                        );
                      }}
                    </form.Field>
                  </CardContent>
                </Card>
              )
            }
          </form.Subscribe>

          <TermsAndConditionsCard />
          <form.Subscribe>
            <div className="w-full">
              <Button type="submit" className="w-full">
                {"Submit Details"}
              </Button>
            </div>
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
