import type { OrgOnBoardingPayload } from "@/apis/api_service";
import { useOrgOnBoardingMutation } from "@/apis/mutation";
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
import { NewSearchableSelect } from "@/signup/NewLocationDropdown";
import type {
  CityShape,
  StateShape,
} from "@/signup/on-boarding/OnBoradingPage";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle,  Loader2, MapPin } from "lucide-react";

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useMemo } from 'react';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export function OrchestratorHQSetup({exam}:{exam:string}) { 
  const [position, setPosition] = useState({ lat: 26.8206, lng: 75.8415 });
  const navigate = useNavigate();
  const startOnBoarding = useOrgOnBoardingMutation();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  function LocationMarker() {
    useMapEvents({
      click(e:any) {
        setPosition(e.latlng);
        console.log("Coordinate for Go:", e.latlng.lat, e.latlng.lng);
      },
    });

    return (
      <Marker 
        position={position} 
        draggable={true}
        eventHandlers={useMemo(() => ({
          dragend(e: { target: any; }) {
            const marker = e.target;
            const newPos = marker.getLatLng();
            setPosition(newPos);
          },
        }), [])}
      />
    );
  }

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
        setIsLocating(false);
        
        console.log("Coordinates captured:", { latitude, longitude, accuracy });

        // ALERT the user so you know it worked
        alert(`Location found!\nLat: ${latitude}\nLong: ${longitude}\nAccuracy: ${accuracy} meters`);

        /* NEXT STEP: 
           You can now send these to your Go backend 
           or set them into your form state 
        */
      },
      (error) => {
        setIsLocating(false);
        console.error("Error getting location:", error);
        alert(`Location Error: ${error.message}`);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 60000
      }
    );
  };



  return (
    <div className="space-y-4 p-6 flex">
      <form className="flex-1">
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
          <CardFooter>
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
      <Card className="flex-1 overflow-hidden border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm">Location Picker (OpenStreetMap)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full rounded-md border overflow-hidden">
          <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Current: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
      </CardFooter>
    </Card>
    </div>
  );
}
