// hooks/use-location-engine.ts
import { useCountries, useStateOfCountries, useCitiesOfState } from "@/apis/Queries";
import { useState } from "react";

export function useLocationEngine() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const countries = useCountries();
  const states = useStateOfCountries(selectedCountry || "");
  const cities = useCitiesOfState(selectedCountry || "", selectedState || "");

  return {
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    queries: {
      countries,
      states,
      cities
    }
  };
}