// privileges.ts
export const PERMISSION_TYPES = ["READ", "WRITE", "DELETE", "NONE"] as const;
export const MODULE_PERMISSION_TYPES = ["FULL", "PARTIAL", "NONE"] as const;

export type PermissionType = typeof PERMISSION_TYPES[number];
export type ModulePermissionType = typeof MODULE_PERMISSION_TYPES[number];

export interface Section {
  section: string;
  modules: string[];
}

export interface ModulePrivilege {
  module_name: string;
  module_id: string;
 [key: string]: Section[] | string; // allow string for known keys
}

export const PRIVILEGES: ModulePrivilege[] = [
  {
    module_name: "Sharp Hospitality",
    module_id: "sharp_hospitality",
    sharp_hospitality: [
      { section: "Hotel", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "Bar", modules: ["Menu", "Orders", "Inventory", "Staff"] },
      { section: "Restaurant", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "Service", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "Menu", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "Kitchen", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "Inventory", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "Housekeeping", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "Settings", modules: ["Overview", "Booking", "Request", "Room Management"] },
      { section: "ORG Configs", modules: ["Overview", "Booking", "Request", "Room Management"] },
    ],
  },
  {
    module_name: "Sharp Accounting",
    module_id: "sharp_accounting",
    sharp_accounting: [
      { section: "Invoices", modules: ["Create", "View", "Delete", "Export"] },
      { section: "Expenses", modules: ["Add", "Approve", "Reject", "View"] },
      { section: "Reports", modules: ["Profit & Loss", "Balance Sheet", "Cash Flow"] },
      { section: "Settings", modules: ["Tax", "Payment Methods", "Approval Workflow"] },
    ],
  },
  {
    module_name: "Sharp Marketing",
    module_id: "sharp_marketing",
    sharp_marketing: [
      { section: "Campaigns", modules: ["Create", "Edit", "Delete", "View"] },
      { section: "Leads", modules: ["Import", "Export", "Assign", "Follow Up"] },
      { section: "Analytics", modules: ["Overview", "Reports", "Performance Metrics"] },
      { section: "Settings", modules: ["Channels", "Templates", "Automation Rules"] },
    ],
  },
  {
    module_name: "Sharp HR",
    module_id: "sharp_hr",
    sharp_hr: [
      { section: "Employees", modules: ["Add", "Edit", "Terminate", "View"] },
      { section: "Attendance", modules: ["Mark", "Edit", "Reports", "Export"] },
      { section: "Payroll", modules: ["Generate", "Approve", "View", "Export"] },
      { section: "Recruitment", modules: ["Post Job", "Shortlist", "Interview", "Offer"] },
    ],
  },
];
