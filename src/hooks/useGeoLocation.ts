import { useState, useEffect } from "react";

export function useGeolocation(form: any) {
  const [isLocating, setIsLocating] = useState(false);
  
  // Track local state for immediate return/display
  const [coords, setCoords] = useState<{
    latitude: number | undefined;
    longitude: number | undefined;
    accuracy: number | undefined;
  }>({
    latitude: undefined,
    longitude: undefined,
    accuracy: undefined,
  });

  const captureLocation = (showNativeAlert = false) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // 1. Update the local hook state
        setCoords({ latitude, longitude, accuracy });

        // 2. Update the TanStack form state
        form.setFieldValue("latitude", latitude as any);
        form.setFieldValue("longitude", longitude as any);
        form.setFieldValue("accuracy_m", accuracy as any);

        setIsLocating(false);

        if (showNativeAlert) {
          alert(`Location captured: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      },
      (error) => {
        setIsLocating(false);
        console.error("Location error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    captureLocation(false);
  }, []);

  return { 
    isLocating, 
    captureLocation,
    // Return the individual values as requested
    latitude: coords.latitude,
    longitude: coords.longitude,
    accuracy: coords.accuracy 
  };
}