/**
 * Dummy Folio library.
 *
 * Stands in until the content API exists. Every item carries the workspace it
 * lives in and the person who last touched it, because in Folio a file without
 * a workspace has no permissions and a file without an editor has no history --
 * neither is a state the real product can represent.
 */

export type FileKind =
  | "doc"
  | "sheet"
  | "slides"
  | "pdf"
  | "board"
  | "note"
  | "markdown";

export type FolioFile = {
  id: string;
  name: string;
  kind: FileKind;
  workspace: string;
  owner: string;
  editedBy: string;
  editedAt: string;
  /** Relative label, kept alongside the date so lists read naturally. */
  edited: string;
  size: string;
  shared: boolean;
  collaborators: string[];
  comments: number;
};

export const kindLabel: Record<FileKind, string> = {
  doc: "Document",
  sheet: "Spreadsheet",
  slides: "Presentation",
  pdf: "PDF",
  board: "Whiteboard",
  note: "Note",
  markdown: "Markdown",
};

export const workspaces = [
  { id: "ws_ops", name: "Operations", items: 48, members: 12 },
  { id: "ws_finance", name: "Finance", items: 31, members: 6 },
  { id: "ws_people", name: "People & HR", items: 27, members: 9 },
  { id: "ws_product", name: "Product", items: 64, members: 15 },
];

export const files: FolioFile[] = [
  {
    id: "f_001",
    name: "Q3 Operations Review",
    kind: "doc",
    workspace: "Operations",
    owner: "Priya Nair",
    editedBy: "Priya Nair",
    editedAt: "2026-09-05",
    edited: "2 hours ago",
    size: "184 KB",
    shared: true,
    collaborators: ["PN", "DC", "AS"],
    comments: 7,
  },
  {
    id: "f_002",
    name: "FY26 Budget Model",
    kind: "sheet",
    workspace: "Finance",
    owner: "Daniel Cruz",
    editedBy: "Asha Patel",
    editedAt: "2026-09-05",
    edited: "4 hours ago",
    size: "1.2 MB",
    shared: true,
    collaborators: ["DC", "AP"],
    comments: 12,
  },
  {
    id: "f_003",
    name: "Board Deck — September",
    kind: "slides",
    workspace: "Finance",
    owner: "Daniel Cruz",
    editedBy: "Daniel Cruz",
    editedAt: "2026-09-04",
    edited: "Yesterday",
    size: "8.4 MB",
    shared: true,
    collaborators: ["DC", "PN", "RM", "SW"],
    comments: 3,
  },
  {
    id: "f_004",
    name: "Vendor Agreement — Ardent Packaging",
    kind: "pdf",
    workspace: "Operations",
    owner: "Rohan Mehta",
    editedBy: "Rohan Mehta",
    editedAt: "2026-09-04",
    edited: "Yesterday",
    size: "2.1 MB",
    shared: false,
    collaborators: ["RM"],
    comments: 5,
  },
  {
    id: "f_005",
    name: "Warehouse Layout — North Hub",
    kind: "board",
    workspace: "Operations",
    owner: "Asha Patel",
    editedBy: "Rohan Mehta",
    editedAt: "2026-09-03",
    edited: "2 days ago",
    size: "640 KB",
    shared: true,
    collaborators: ["AP", "RM", "DC"],
    comments: 9,
  },
  {
    id: "f_006",
    name: "Onboarding Checklist",
    kind: "doc",
    workspace: "People & HR",
    owner: "Sara Whitfield",
    editedBy: "Sara Whitfield",
    editedAt: "2026-09-03",
    edited: "2 days ago",
    size: "92 KB",
    shared: true,
    collaborators: ["SW", "PN"],
    comments: 2,
  },
  {
    id: "f_007",
    name: "Headcount Plan 2026",
    kind: "sheet",
    workspace: "People & HR",
    owner: "Sara Whitfield",
    editedBy: "Daniel Cruz",
    editedAt: "2026-09-02",
    edited: "3 days ago",
    size: "410 KB",
    shared: true,
    collaborators: ["SW", "DC"],
    comments: 4,
  },
  {
    id: "f_008",
    name: "Release Notes — v4.2",
    kind: "markdown",
    workspace: "Product",
    owner: "Imran Qureshi",
    editedBy: "Imran Qureshi",
    editedAt: "2026-09-02",
    edited: "3 days ago",
    size: "24 KB",
    shared: false,
    collaborators: ["IQ"],
    comments: 0,
  },
  {
    id: "f_009",
    name: "Customer Interview — Meridian",
    kind: "note",
    workspace: "Product",
    owner: "Elena Duarte",
    editedBy: "Elena Duarte",
    editedAt: "2026-09-01",
    edited: "4 days ago",
    size: "38 KB",
    shared: false,
    collaborators: ["ED"],
    comments: 1,
  },
  {
    id: "f_010",
    name: "Roadmap Workshop",
    kind: "board",
    workspace: "Product",
    owner: "Imran Qureshi",
    editedBy: "Elena Duarte",
    editedAt: "2026-08-31",
    edited: "5 days ago",
    size: "1.8 MB",
    shared: true,
    collaborators: ["IQ", "ED", "PN", "AP"],
    comments: 15,
  },
  {
    id: "f_011",
    name: "Compliance Policy 2026",
    kind: "pdf",
    workspace: "People & HR",
    owner: "Sara Whitfield",
    editedBy: "Sara Whitfield",
    editedAt: "2026-08-28",
    edited: "Last week",
    size: "3.4 MB",
    shared: true,
    collaborators: ["SW", "PN"],
    comments: 6,
  },
  {
    id: "f_012",
    name: "Pricing Experiments",
    kind: "sheet",
    workspace: "Product",
    owner: "Elena Duarte",
    editedBy: "Imran Qureshi",
    editedAt: "2026-08-27",
    edited: "Last week",
    size: "780 KB",
    shared: true,
    collaborators: ["ED", "IQ"],
    comments: 8,
  },
];

export const activity = [
  {
    id: "act_1",
    who: "Priya Nair",
    action: "commented on",
    target: "Q3 Operations Review",
    when: "12 minutes ago",
  },
  {
    id: "act_2",
    who: "Asha Patel",
    action: "edited",
    target: "FY26 Budget Model",
    when: "4 hours ago",
  },
  {
    id: "act_3",
    who: "Daniel Cruz",
    action: "shared",
    target: "Board Deck — September",
    when: "Yesterday",
  },
  {
    id: "act_4",
    who: "Rohan Mehta",
    action: "annotated",
    target: "Vendor Agreement — Ardent Packaging",
    when: "Yesterday",
  },
  {
    id: "act_5",
    who: "Elena Duarte",
    action: "restored a version of",
    target: "Roadmap Workshop",
    when: "2 days ago",
  },
];

export const trashed: FolioFile[] = [
  {
    id: "f_t01",
    name: "Old Supplier List",
    kind: "sheet",
    workspace: "Operations",
    owner: "Rohan Mehta",
    editedBy: "Rohan Mehta",
    editedAt: "2026-08-14",
    edited: "Deleted 3 weeks ago",
    size: "120 KB",
    shared: false,
    collaborators: ["RM"],
    comments: 0,
  },
  {
    id: "f_t02",
    name: "Draft — Offsite Agenda",
    kind: "doc",
    workspace: "People & HR",
    owner: "Sara Whitfield",
    editedBy: "Sara Whitfield",
    editedAt: "2026-08-20",
    edited: "Deleted 2 weeks ago",
    size: "46 KB",
    shared: false,
    collaborators: ["SW"],
    comments: 0,
  },
];
