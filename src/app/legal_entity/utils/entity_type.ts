export type LegalEntityType =
  | "SOLE_PROPRIETORSHIP"
  | "PARTNERSHIP"
  | "LIMITED_LIABILITY_PARTNERSHIP"
  | "PRIVATE_LIMITED_COMPANY"
  | "PUBLIC_LIMITED_COMPANY"
  | "ONE_PERSON_COMPANY"
  | "SECTION_8_COMPANY"
  | "COOPERATIVE_SOCIETY"
  | "TRUST"
  | "SOCIETY";

export const LegalEntityTypeLabel: Record<LegalEntityType, string> = {
  SOLE_PROPRIETORSHIP: "Sole Proprietorship",
  PARTNERSHIP: "Partnership Firm",
  LIMITED_LIABILITY_PARTNERSHIP: "Limited Liability Partnership (LLP)",
  PRIVATE_LIMITED_COMPANY: "Private Limited Company",
  PUBLIC_LIMITED_COMPANY: "Public Limited Company",
  ONE_PERSON_COMPANY: "One Person Company (OPC)",
  SECTION_8_COMPANY: "Section 8 Company (Non-Profit)",
  COOPERATIVE_SOCIETY: "Cooperative Society",
  TRUST: "Trust (NGO / Charitable)",
  SOCIETY: "Society (NGO / Charitable)",
};

/**
 * Safely resolves legal entity type string tokens into display text.
 * Falls back to raw value if string matches unlisted custom variations.
 */
export const getLegalEntityTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";
  return LegalEntityTypeLabel[type as LegalEntityType] || type;
};

/* ---------------------------------- <***> --------------------------------- */

export type LegalEntityBankAccountType = "CURRENT" | "SAVINGS" | "ODCC";

export const LegalEntityBankAccountTypeLabel: Record<
  LegalEntityBankAccountType,
  string
> = {
  CURRENT: "Current Account",
  SAVINGS: "Savings Account",
  ODCC: "Overdraft / Cash Credit (OD/CC)",
};

/**
 * Safely resolves bank account type string tokens into display text.
 * Falls back to raw value if string matches unlisted custom variations.
 */
export const getLegalEntityBankAccountTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";
  return (
    LegalEntityBankAccountTypeLabel[type as LegalEntityBankAccountType] || type
  );
};
/* ---------------------------------- <***> --------------------------------- */

export type LegalEntityGstRegistrationType =
  | "REGULAR"
  | "COMPOSITION"
  | "SEZ"
  | "ISD"
  | "CASUAL";

export const LegalEntityGSTRegistrationTypeLabel: Record<
  LegalEntityGstRegistrationType,
  string
> = {
  REGULAR: "Regular Taxpayer",
  COMPOSITION: "Composition Scheme",
  SEZ: "SEZ Developer / Unit",
  ISD: "Input Service Distributor (ISD)",
  CASUAL: "Casual Taxable Person",
};

/* ---------------------------------- <***> --------------------------------- */

export type LegalEntityIdentifierType =
  | "PAN"
  | "CIN"
  | "TAN"
  | "UDYAM"
  | "IEC"
  | "DPIIT"
  | "LLPIN";

export const LegalEntityIdentifierTypeLabel: Record<
  LegalEntityIdentifierType,
  string
> = {
  PAN: "Permanent Account Number (PAN)",
  CIN: "Corporate Identification Number (CIN)",
  TAN: "Tax Deduction Account Number (TAN)",
  UDYAM: "Udyam MSME Registration",
  IEC: "Import Export Code (IEC)",
  DPIIT: "DPIIT Startup Recognition",
  LLPIN: "LLP Identification Number (LLPIN)",
};

/**
 * Safely resolves identifier type string tokens into display text.
 * Falls back to raw value if string matches unlisted custom variations.
 */
export const getLegalEntityIdentifierTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";
  return (
    LegalEntityIdentifierTypeLabel[type as LegalEntityIdentifierType] || type
  );
};

/* ---------------------------------- <***> --------------------------------- */

export const LEGAL_ENTITY_CONTACT_TYPES = [
  "DIRECTOR",
  "AUTHORIZED_SIGNATORY",
  "ACCOUNTS",
  "COMPLIANCE",
  "OPERATIONS",
] as const;

export type LegalEntityContactType =
  (typeof LEGAL_ENTITY_CONTACT_TYPES)[number];

export const LegalEntityContactTypeLabel: Record<
  LegalEntityContactType,
  string
> = {
  DIRECTOR: "Director / Partner",
  AUTHORIZED_SIGNATORY: "Authorized Signatory",
  ACCOUNTS: "Accounts / Finance Team",
  COMPLIANCE: "Compliance / Legal Officer",
  OPERATIONS: "Operations Manager",
};

/**
 * Safely resolves contact type tokens into clean display values.
 */
export const getLegalEntityContactTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";

  return LegalEntityContactTypeLabel[type as LegalEntityContactType] || type;
};
/* ---------------------------------- <***> --------------------------------- */

export type LegalEntityLicenseType =
  | "FSSAI"
  | "LIQUOR"
  | "FIRE"
  | "HEALTH"
  | "TRADE"
  | "SHOP_ESTAB"
  | "PCB"
  | "DRUG"
  | "PF"
  | "ESIC"
  | "PT";

export const LegalEntityLicenseTypeLabel: Record<
  LegalEntityLicenseType,
  string
> = {
  FSSAI: "FSSAI (Food Safety License)",
  LIQUOR: "Liquor License",
  FIRE: "Fire Safety NOC",
  HEALTH: "Health Trade License",
  TRADE: "Trade License",
  SHOP_ESTAB: "Shops & Establishment Registration",
  PCB: "Pollution Control Board NOC",
  DRUG: "Drug License",
  PF: "Provident Fund (PF) Registration",
  ESIC: "ESIC Registration",
  PT: "Professional Tax (PT) Registration",
};

/**
 * Safely resolves license type tokens into readable display strings.
 */
export const getLegalEntityLicenseTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";
  return LegalEntityLicenseTypeLabel[type as LegalEntityLicenseType] || type;
};

/* ---------------------------------- <***> --------------------------------- */

export type LegalEntityAddressType =
  | "REGISTERED"
  | "OPERATING"
  | "GST"
  | "WAREHOUSE"
  | "BRANCH";

export const LegalEntityAddressTypeLabel: Record<
  LegalEntityAddressType,
  string
> = {
  REGISTERED: "Registered Office",
  OPERATING: "Operating / Corporate Office",
  GST: "GST Registered Address",
  WAREHOUSE: "Warehouse / Storage Facility",
  BRANCH: "Branch Office",
};

/**
 * Safely resolves address location tokens into clean UI component text.
 */
export const getLegalEntityAddressTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";
  return LegalEntityAddressTypeLabel[type as LegalEntityAddressType] || type;
};

/* ---------------------------------- <***> --------------------------------- */

export type LegalEntityTaxComponentType =
  | "CGST"
  | "SGST"
  | "IGST"
  | "UGST"
  | "CESS"
  | "VAT";

export const LegalEntityTaxComponentTypeLabel: Record<
  LegalEntityTaxComponentType,
  string
> = {
  CGST: "Central Goods and Services Tax (CGST)",
  SGST: "State Goods and Services Tax (SGST)",
  IGST: "Integrated Goods and Services Tax (IGST)",
  UGST: "Union Territory Goods and Services Tax (UTGST)",
  CESS: "Compensation Cess",
  VAT: "Value Added Tax Component",
};

/**
 * Safely resolves tax component type string tokens into display text.
 * Falls back to raw value if string matches unlisted custom variations.
 */
export const getLegalEntityTaxComponentTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";
  return (
    LegalEntityTaxComponentTypeLabel[type as LegalEntityTaxComponentType] ||
    type
  );
};

/* ---------------------------------- <***> --------------------------------- */

export type LegalEntityTaxType = "GST" | "VAT";

export const LegalEntityTaxTypeLabel: Record<LegalEntityTaxType, string> = {
  GST: "Goods and Services Tax (GST)",
  VAT: "Value Added Tax (VAT)",
};

/**
 * Safely resolves tax type string tokens into display text.
 * Falls back to raw value if string matches unlisted custom variations.
 */
export const getLegalEntityTaxTypeLabel = (
  type: string | null | undefined,
): string => {
  if (!type) return "";
  return LegalEntityTaxTypeLabel[type as LegalEntityTaxType] || type;
};

/* ---------------------------------- <***> --------------------------------- */
