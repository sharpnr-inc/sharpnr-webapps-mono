// Business module name enums (mirror the Go constants)
export type HospitalityModuleType =
  | "RESTAURANT"
  | "HOTEL"
  | "BAR"
  | "NIGHT_CLUB"
  | "RESORT"
  | "CLOUD_KITCHEN/TAKEAWAYS";

export type HealthcareModuleType =
  | "HOSPITAL"
  | "CLINIC"
  | "PHARMACY"
  | "DIAGNOSTICS"
  | "TELEMEDICINE"
  | "HOME_CARE";

// Business modules
export interface HospitalityModule {
  id: string;
  moduleName: HospitalityModuleType;
  description: string;
  isAvailable: boolean;
  tags: string[];
}

export interface HealthcareModule {
  id: string;
  moduleName: HealthcareModuleType;
  description: string;
  isAvailable: boolean;
  tags: string[];
}

// The `data` payload
export interface BusinessModulesData {
  hospitality: HospitalityModule[];
  healthcare: HealthcareModule[];
}

export interface InfraModule {
  id: string;
  moduleName: string;
  description: string;
  isAvailable: boolean;
  tags: string[];
}

// Badge values seen in the UI
export type InfraBadge = "Required" | "Recommended";

// General infra (has an optional badge)
export interface GeneralInfraModule {
  id: string;
  moduleName: string;
  description: string;
  isAvailable: boolean;
  badge?: InfraBadge; // omitted when empty (Go `omitempty`)
  tags: string[];
}

export interface InfraModulesData {
  general: GeneralInfraModule[]; // keeps the badge
  hospitality: InfraModule[];
  healthcare: InfraModule[];
}
