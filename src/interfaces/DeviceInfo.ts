export interface DeviceInfo {
  os: string;
  browser: string;
  deviceId: string;
  geoLocation: {
    latitude: number | null;
    longitude: number | null;
  };
}
