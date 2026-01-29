
import {
  useCitiesOfState,
  useCountries,
  useStateOfCountries,
} from "@/apis/Queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { NewSearchableSelect } from "@/signup_and_auth/NewLocationDropdown";
import { useForm } from "@tanstack/react-form";
import {
  AlertCircle,
  Building2Icon,
  Loader2,
  MapPin,
  MoveRight,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

import { useParams } from "@tanstack/react-router";
import { useAddPropertyMutation } from "@/_orchestrator/SetupWizard/api/mutation";



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

export function AddPropertyCard() {
  //------------Hoisting-------------
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  // -----------------------------------------------------
  const addproprt = useAddPropertyMutation();


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

  const defaultOnBoardingVal: any = {
    name: "Sharpnr Complex",
    address_line: "",
    city: "",
    state: "",
    country: "",
    pincode: "",

    latitude: 0,
    longitude: 0,
    accuracy_m: 0,
  };

  const form = useForm({
    defaultValues: defaultOnBoardingVal,
    onSubmit: async ({ value }) => {
      console.log(value);
      await addproprt.mutateAsync(value, {
        onSuccess: async () => {
          
        },
      });
    },
  });

  // Auto-detect location on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Set form values
        form.setFieldValue("latitude", latitude);
        form.setFieldValue("longitude", longitude);
        form.setFieldValue("accuracy_m", accuracy);

        // Console log the values
        console.log("Auto-detected Location:");
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        console.log("Accuracy (meters):", accuracy);

        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        console.error("Error getting location:", error);
        console.log(`Location Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  }, []); // Empty dependency array means this runs once on mount

  const handleGeolocation = (e: React.MouseEvent) => {
    e.preventDefault(); // STOP THE RELOAD
    e.stopPropagation();

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Set form values
        form.setFieldValue("latitude", latitude);
        form.setFieldValue("longitude", longitude);
        form.setFieldValue("accuracy_m", accuracy);

        setIsLocating(false);

        console.log("Coordinates captured:", { latitude, longitude, accuracy });

        // ALERT the user so you know it worked
        alert(
          `Location found!\nLat: ${latitude}\nLong: ${longitude}\nAccuracy: ${accuracy} meters`,
        );
      },
      (error) => {
        setIsLocating(false);

        console.error("Error getting location:", error);
        alert(`Location Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  };

  return (
    <div className="space-y-4 p-6 flex">
      <form
        className="flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="latitude">
          {(field) => <input type="hidden" value={field.state.value ?? 0} />}
        </form.Field>

        <form.Field name="longitude">
          {(field) => <input type="hidden" value={field.state.value ?? 0} />}
        </form.Field>

        <form.Field name="accuracy_m">
          {(field) => <input type="hidden" value={field.state.value ?? 0} />}
        </form.Field>
        <form.Field name="name">
          {(field) => (
            <input type="hidden" value={field.state.value ?? "something"} />
          )}
        </form.Field>
        <Card className="border-2 shadow-lg overflow-hidden">
          <CardHeader className="">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2Icon />
              Add Property
            </CardTitle>
            <CardDescription>
              Provide your organization's address information
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Full Address */}
            <form.Field
              name="address_line"
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
                name="country"
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
                          form.setFieldValue("state", "");
                          form.setFieldValue("city", "");
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
                name="state"
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
                          form.setFieldValue("city", "");
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
                name="city"
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
                            city.longitude,
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
                name="pincode"
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
          <CardFooter className="flex flex-col gap-3">
                   <Button
              type="submit"
              variant="default"
              className="w-full flex gap-2"
              disabled={isLocating}
            >
              Save and Continue
              <MoveRight />
            </Button>


            <Button
              type="button"
              variant="outline"
              className="w-full flex gap-2"
              onClick={handleGeolocation}
              disabled={isLocating}
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
              {isLocating ? "Fetching Location..." : "Auto-detect Location"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
