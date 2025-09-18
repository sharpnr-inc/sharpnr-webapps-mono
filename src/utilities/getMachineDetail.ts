import type { DeviceInfo } from "@/interfaces/DeviceInfo";

export async function getDeviceInfo(): Promise<DeviceInfo> {
  const userAgent = navigator.userAgent;

  let os = "Unknown OS";
  if (userAgent.indexOf("Win") !== -1) os = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (userAgent.indexOf("Android") !== -1) os = "Android";
  else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

  let browser = "Unknown Browser";
  if (userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
  else if (userAgent.indexOf("Safari") !== -1) browser = "Safari";
  else if (userAgent.indexOf("Edge") !== -1) browser = "Edge";
  else if (userAgent.indexOf("OPR") !== -1) browser = "Opera";

  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = "device-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("deviceId", deviceId);
  }

  const geoLocation = await new Promise<{ latitude: number | null; longitude: number | null }>(
    (resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: null, longitude: null });
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => resolve({ latitude: null, longitude: null })
        );
      }
    }
  );

  return { os, browser, deviceId, geoLocation };
}
