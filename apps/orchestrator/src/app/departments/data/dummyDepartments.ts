export type Department = {
  ID: string;
  name: string;
  code: string;
  head: string;
  email: string;
  location: string;
  members: number;
  status: "active" | "inactive";
};

export const DUMMY_DEPARTMENTS: Department[] = [
  {
    ID: "dep-001",
    name: "Engineering",
    code: "ENG",
    head: "Arjun Mehta",
    email: "engineering@sharpnr.com",
    location: "Bengaluru HQ",
    members: 42,
    status: "active",
  },
  {
    ID: "dep-002",
    name: "Human Resources",
    code: "HR",
    head: "Priya Sharma",
    email: "hr@sharpnr.com",
    location: "Bengaluru HQ",
    members: 8,
    status: "active",
  },
  {
    ID: "dep-003",
    name: "Finance & Accounts",
    code: "FIN",
    head: "Rahul Verma",
    email: "finance@sharpnr.com",
    location: "Mumbai Office",
    members: 12,
    status: "active",
  },
  {
    ID: "dep-004",
    name: "Sales & Marketing",
    code: "SLS",
    head: "Neha Kapoor",
    email: "sales@sharpnr.com",
    location: "Delhi Office",
    members: 23,
    status: "active",
  },
  {
    ID: "dep-005",
    name: "Operations",
    code: "OPS",
    head: "Vikram Singh",
    email: "ops@sharpnr.com",
    location: "Bengaluru HQ",
    members: 17,
    status: "active",
  },
  {
    ID: "dep-006",
    name: "Legal & Compliance",
    code: "LGL",
    head: "Ananya Iyer",
    email: "legal@sharpnr.com",
    location: "Mumbai Office",
    members: 5,
    status: "inactive",
  },
];
