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
