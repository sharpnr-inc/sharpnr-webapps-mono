export type UserStatus = "active" | "invited" | "suspended";

/** A member of the organization. Mirrors the likely Sentinel user shape. */
export interface OrgUser {
  id: string;
  /** Short employee/badge id shown on the card. */
  employeeId: string;
  name: string;
  email: string;
  /** Job title, e.g. "Front Desk Manager". */
  title: string;
  department: string;
  role: string;
  status: UserStatus;
  avatarUrl: string;
  /** ISO date the user joined the organization. */
  joinedAt: string;
}

/** Placeholder org members for building the users UI before the API is wired. */
export const MOCK_USERS: OrgUser[] = [
  {
    id: "usr_amelia",
    employeeId: "EMP-0142",
    name: "Amelia Carter",
    email: "amelia.carter@sharpnr.com",
    title: "Front Desk Manager",
    department: "Operations",
    role: "Manager",
    status: "active",
    avatarUrl: "https://i.pravatar.cc/300?img=47",
    joinedAt: "2024-03-12T09:00:00Z",
  },
  {
    id: "usr_dev",
    employeeId: "EMP-0188",
    name: "Dev Patel",
    email: "dev.patel@sharpnr.com",
    title: "Head Chef",
    department: "Kitchen",
    role: "Manager",
    status: "active",
    avatarUrl: "https://i.pravatar.cc/300?img=12",
    joinedAt: "2023-11-02T09:00:00Z",
  },
  {
    id: "usr_sofia",
    employeeId: "EMP-0203",
    name: "Sofia Rossi",
    email: "sofia.rossi@sharpnr.com",
    title: "Finance Lead",
    department: "Finance",
    role: "Admin",
    status: "active",
    avatarUrl: "https://i.pravatar.cc/300?img=32",
    joinedAt: "2022-07-19T09:00:00Z",
  },
  {
    id: "usr_liam",
    employeeId: "EMP-0231",
    name: "Liam O'Connor",
    email: "liam.oconnor@sharpnr.com",
    title: "Front Desk Associate",
    department: "Operations",
    role: "Staff",
    status: "invited",
    avatarUrl: "https://i.pravatar.cc/300?img=15",
    joinedAt: "2026-06-20T09:00:00Z",
  },
  {
    id: "usr_mia",
    employeeId: "EMP-0244",
    name: "Mia Nguyen",
    email: "mia.nguyen@sharpnr.com",
    title: "Housekeeping Supervisor",
    department: "Housekeeping",
    role: "Staff",
    status: "active",
    avatarUrl: "https://i.pravatar.cc/300?img=20",
    joinedAt: "2025-01-08T09:00:00Z",
  },
  {
    id: "usr_noah",
    employeeId: "EMP-0259",
    name: "Noah Williams",
    email: "noah.williams@sharpnr.com",
    title: "Bar Lead",
    department: "Bar",
    role: "Staff",
    status: "suspended",
    avatarUrl: "https://i.pravatar.cc/300?img=51",
    joinedAt: "2024-09-30T09:00:00Z",
  },
];
