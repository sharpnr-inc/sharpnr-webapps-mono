import type { Employee } from "../api/types";

/**
 * Sample org members used until the backend endpoint lands.
 * Dates are generated relative to "now" so the data always looks current.
 */
const daysAgo = (d: number) =>
  new Date(Date.now() - d * 86_400_000).toISOString();
const hoursAgo = (h: number) =>
  new Date(Date.now() - h * 3_600_000).toISOString();

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "emp_01",
    name: "Maria Garcia",
    email: "maria.garcia@acme.com",
    role: "super_admin",
    status: "active",
    department: "Operations",
    joinedAt: daysAgo(540),
    lastActiveAt: hoursAgo(1),
    activity: [
      {
        id: "act_1",
        timestamp: hoursAgo(1),
        action: "Updated billing settings",
        target: "Organization",
      },
      {
        id: "act_2",
        timestamp: hoursAgo(6),
        action: "Invited new member",
        target: "lucas.muller@acme.com",
      },
      {
        id: "act_3",
        timestamp: daysAgo(2),
        action: "Changed role to Admin",
        target: "James Chen",
      },
    ],
  },
  {
    id: "emp_02",
    name: "James Chen",
    email: "james.chen@acme.com",
    role: "admin",
    status: "active",
    department: "Finance",
    joinedAt: daysAgo(320),
    lastActiveAt: hoursAgo(4),
    activity: [
      {
        id: "act_4",
        timestamp: hoursAgo(4),
        action: "Exported payment report",
        target: "Q2 transactions",
      },
      {
        id: "act_5",
        timestamp: daysAgo(1),
        action: "Approved expense",
        target: "EXP-1180",
      },
    ],
  },
  {
    id: "emp_03",
    name: "Aisha Okafor",
    email: "aisha.okafor@acme.com",
    role: "manager",
    status: "active",
    department: "Sales",
    joinedAt: daysAgo(210),
    lastActiveAt: daysAgo(1),
    activity: [
      {
        id: "act_6",
        timestamp: daysAgo(1),
        action: "Created customer",
        target: "Metro Wholesale Co.",
      },
      {
        id: "act_7",
        timestamp: daysAgo(3),
        action: "Closed support ticket",
        target: "TKT-560",
      },
    ],
  },
  {
    id: "emp_04",
    name: "Lucas Müller",
    email: "lucas.muller@acme.com",
    role: "member",
    status: "invited",
    department: "Engineering",
    joinedAt: daysAgo(2),
    lastActiveAt: daysAgo(2),
    activity: [
      {
        id: "act_8",
        timestamp: daysAgo(2),
        action: "Invitation sent",
        target: "lucas.muller@acme.com",
      },
    ],
  },
  {
    id: "emp_05",
    name: "Priya Sharma",
    email: "priya.sharma@acme.com",
    role: "member",
    status: "suspended",
    department: "Support",
    joinedAt: daysAgo(150),
    lastActiveAt: daysAgo(20),
    activity: [
      {
        id: "act_9",
        timestamp: daysAgo(20),
        action: "Account suspended",
        target: "by Maria Garcia",
      },
      {
        id: "act_10",
        timestamp: daysAgo(25),
        action: "Logged in",
      },
    ],
  },
];
