import type { OrgOnBoardingPayload } from "@/apis/api_service";
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
import { useAddPropertyMutation } from "./api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { setupProgressQuery } from "./api/queries";



export function SetupWizardProperty() {
  //------------Hoisting-------------
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  // -----------------------------------------------------
  const addproprt = useAddPropertyMutation();
  const queryClient = useQueryClient();

  const { stepId } = useParams({ strict: false });

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
    step_id: stepId,
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
          await queryClient.invalidateQueries({
            queryKey: setupProgressQuery.queryKey,
          });
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
       
      </form>
    </div>
  );
}
