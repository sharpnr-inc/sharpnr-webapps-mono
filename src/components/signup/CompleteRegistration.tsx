import {
  createCountriesQuery,
  createStatesQuery,
  createCitiesQuery,
} from "@/api_service/queries/fetchstateandcities";
import {
  CompleteOrgResgistrationSchema,
  type CompleteOrgResgistrationPayload,
} from "@/schemas/Auth";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { Building2, MapPin, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Tooltip } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useCompleteOrganisation } from "@/api_service/mutations/completeResgistration";

export default function CompleteRegistration() {
  const compeleteOrgReg = useCompleteOrganisation();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const countriesQuery = useQuery(createCountriesQuery());
  const statesQuery = useQuery(createStatesQuery(selectedCountry));
  const citiesQuery = useQuery(
    createCitiesQuery(selectedCountry, selectedState)
  );

  const form = useForm({
    validators: { onChange: CompleteOrgResgistrationSchema },
    defaultValues: {
      registration_details: {
        is_register: false,
        gst_number: "",
        cin_number: "",
      },
      address_details: {
        country: "",
        city: "",
        state: "",
        pincode: "",
        address_line: "",
        area_locality:""
      },
      is_owner: true,
    } as CompleteOrgResgistrationPayload,
    onSubmit: async ({ value }) => {
      console.log(value)
      compeleteOrgReg.mutate(value)
    },
  });

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Complete Company Registration</h1>
          <p className="text-gray-500 mt-2">
            Provide your organization details
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
            <CardDescription>
              The Basic Details of the Organisation
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label>Root Email/Org Super Admin Email</Label>
                </TooltipTrigger>
                <TooltipContent>
                  This is the email of the Organisation which will perform the
                  Super Admin tasks.
                </TooltipContent>
              </Tooltip>
              <Input value="Kashifsocl@gmail.com" disabled />
            </div>

            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label>Organisation Business Operation Type</Label>
                </TooltipTrigger>
                <TooltipContent>
                  Defines what type of business the organisation operates.
                </TooltipContent>
              </Tooltip>
              <Input value="HOTEL" disabled />
            </div>

            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label>Organisation Mobile</Label>
                </TooltipTrigger>
                <TooltipContent>
                  Defines what type of business the organisation operates.
                </TooltipContent>
              </Tooltip>
              <Input value="HOTEL" disabled />
            </div>

            <div className="space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label>Organisation Name</Label>
                </TooltipTrigger>
                <TooltipContent>
                  Defines what type of business the organisation operates.
                </TooltipContent>
              </Tooltip>
              <Input value="HOTEL" disabled />
            </div>
          </CardContent>
        </Card>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Registration Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Registration Details
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <form.Field name="registration_details.is_register">
                {({ state, handleChange }) => (
                  <div className="flex items-center gap-2 border rounded-lg p-3">
                    <Checkbox
                      checked={state.value}
                      onCheckedChange={(val) => handleChange(!!val)}
                    />
                    <Label>
                      Is Your Organization is registered with govt of India ?
                    </Label>
                  </div>
                )}
              </form.Field>
              <form.Subscribe
                selector={(state) =>
                  state.values.registration_details?.is_register
                }
              >
                {(isRegistered) => (
                  <>
                    {isRegistered && (
                      <>
                        <form.Field name="registration_details.gst_number">
                          {({ state, handleBlur, handleChange }) => (
                            <div>
                              <Label>GST Number</Label>
                              <Input
                                value={state.value}
                                onBlur={handleBlur}
                                onChange={(e) => handleChange(e.target.value)}
                              />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name="registration_details.cin_number">
                          {({ state, handleChange }) => (
                            <div>
                              <Label>CIN Number</Label>
                              <Input
                                value={state.value}
                                onChange={(e) => handleChange(e.target.value)}
                              />
                            </div>
                          )}
                        </form.Field>
                      </>
                    )}
                  </>
                )}
              </form.Subscribe>
            </CardContent>
          </Card>

          {/* Address Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Address Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field name="address_details.area_locality">
                {({ state, handleChange }) => (
                  <div className="md:col-span-2 space-y-2">
                    <Label>Address Line</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
                    <form.Field name="address_details.address_line">
                {({ state, handleChange }) => (
                  <div className="md:col-span-2 space-y-2">
                    <Label>Area/locality</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              {/* Country */}
              <form.Field name="address_details.country">
                {({ state, handleChange }) => (
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      value={state.value}
                      onValueChange={(val) => {
                        handleChange(val);
                        setSelectedCountry(val);
                        form.setFieldValue("address_details.state", "");
                        form.setFieldValue("address_details.city", "");
                        setSelectedState("");
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <Input
                          placeholder="Search Country..."
                          className="mb-2 w-full p-2 border rounded"
                          onChange={(e) => setCountryFilter(e.target.value)}
                        />
                        {countriesQuery.data?.data
                          .filter((c: any) =>
                            c.name
                              .toLowerCase()
                              .includes(countryFilter.toLowerCase())
                          )
                          .map((c: any) => (
                            <SelectItem key={c.iso2} value={c.iso2}>
                              <span className="mr-2">{c.emoji}</span> {c.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              {/* State */}
              <form.Field name="address_details.state">
                {({ state, handleChange }) => (
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select
                      value={state.value}
                      onValueChange={(val) => {
                        handleChange(val);
                        setSelectedState(val);
                        form.setFieldValue("address_details.city", "");
                      }}
                      disabled={!selectedCountry}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <Input
                          placeholder="Search State..."
                          className="mb-2 w-full p-2 border rounded"
                          onChange={(e) => setStateFilter(e.target.value)}
                        />
                        {statesQuery.data?.data
                          ?.filter((s: any) =>
                            s.name
                              .toLowerCase()
                              .includes(stateFilter.toLowerCase())
                          )
                          .map((s: any) => (
                            <SelectItem key={s.id} value={s.iso2}>
                              {s.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              {/* City */}
              <form.Field name="address_details.city">
                {({ state, handleChange }) => (
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select
                      value={state.value}
                      onValueChange={handleChange}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <Input
                          placeholder="Search City..."
                          className="mb-2 w-full p-2 border rounded"
                          onChange={(e) => setCityFilter(e.target.value)}
                        />
                        {citiesQuery.data?.data
                          ?.filter((c: any) =>
                            c.name
                              .toLowerCase()
                              .includes(cityFilter.toLowerCase())
                          )
                          .map((c: any) => (
                            <SelectItem key={c.id} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              <form.Field name="address_details.pincode">
                {({ state, handleChange }) => (
                  <div className="space-y-2"> 
                    <Label>Pincode</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>

          {/* Owner Checkbox */}
          <form.Field name="is_owner">
            {({ state, handleChange }) => (
              <div className="flex items-center gap-2 border rounded-lg p-3">
                <Checkbox
                  checked={state.value}
                  onCheckedChange={(val) => handleChange(!!val)}
                />
                <Label>Are you the owner of this organisation?</Label>
              </div>
            )}
          </form.Field>

          {/* Owner Details Card - Only show if NOT the owner */}
          {/* <form.Subscribe selector={(state) => state.values.is_owner}>
            {(isOwner) => (
              <>
                {!isOwner && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between w-full">
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5 text-orange-600" />
                          Owner Details
                        </CardTitle>
                        <Button
                          type="button"
                          onClick={() =>
                            form.pushFieldValue("owner_details", {
                              owner_name: "",
                              owner_email: "",
                              owner_phone: "",
                            })
                          }
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add Owner
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form.Field name="owner_details" mode="array">
                        {({ state }) =>
                          state.value.map((_, index) => (
                            <div
                              key={index}
                              className="border rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative"
                            >
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() =>
                                  form.removeFieldValue("owner_details", index)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              <form.Field
                                name={`owner_details[${index}].owner_name`}
                              >
                                {({ state, handleChange }) => (
                                  <div>
                                    <Label>Owner Name</Label>
                                    <Input
                                      value={state.value}
                                      onChange={(e) =>
                                        handleChange(e.target.value)
                                      }
                                    />
                                  </div>
                                )}
                              </form.Field>
                              <form.Field
                                name={`owner_details[${index}].owner_email`}
                              >
                                {({ state, handleChange }) => (
                                  <div>
                                    <Label>Owner Email</Label>
                                    <Input
                                      value={state.value}
                                      onChange={(e) =>
                                        handleChange(e.target.value)
                                      }
                                    />
                                  </div>
                                )}
                              </form.Field>
                              <form.Field
                                name={`owner_details[${index}].owner_phone`}
                              >
                                {({ state, handleChange }) => (
                                  <div>
                                    <Label>Owner Phone</Label>
                                    <Input
                                      value={state.value}
                                      onChange={(e) =>
                                        handleChange(e.target.value)
                                      }
                                    />
                                  </div>
                                )}
                              </form.Field>
                            </div>
                          ))
                        }
                      </form.Field>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </form.Subscribe> */}

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white">
              Submit Registration
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
