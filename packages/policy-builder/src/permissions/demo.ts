import type {
  ConditionPalette,
  PermissionCatalog,
  PermissionRules,
} from "./types";

/**
 * Stand-in catalog and roles, so the matrix renders with no backend.
 *
 * The action ids are the real ones from the Go modules
 * (core/org_property/mod_resources and sentinel/mod_resources), so what you see
 * here is what the live catalog will produce. Three deliberate differences,
 * all of which are proposals rather than inventions:
 *
 *   1. `category` — the aggregator does not send this yet. Without it every
 *      resource in the product lands in one flat list.
 *   2. Labels are written for an office administrator, not a developer.
 *      "Add infra modules" is the current label and it means nothing to the
 *      person ticking the box. The contract cannot fix wording, but
 *      validateActions could at least require Label and Description to be
 *      non-empty — today it only checks Name.
 *   3. Instances are inline. Live, they arrive from GetResourceDetails, which
 *      calls each module's InstanceLister.
 */

/** Dummy property instances — shaped like listProperties' "Name (Code)". */
const PROPERTIES = [
  { id: "6f1c9a2e-0b74-4d31-9f52-1a8c7d3e5b90", label: "Sharpnr Grand, Bandra (BOM-GR-01)" },
  { id: "b28d4f61-3c95-4a07-8e13-5d9f2a6c4e77", label: "Sharpnr Suites, Andheri East (BOM-SU-02)" },
  { id: "d94a7b18-6e23-4c50-a1f8-7b2e9c5d3140", label: "Marina Bay Residences (BOM-MB-03)" },
  { id: "3e6f2c85-9a14-4b7d-8c02-6f5a1d8e2b93", label: "Sharpnr Plaza, Lower Parel (BOM-PL-04)" },
  { id: "a17c5d90-2f68-4e13-b954-8d3a7c1f6b25", label: "Cyber Greens Tech Park (PNQ-CG-01)" },
  { id: "58b3e7c2-4d19-4a86-9f70-2c6b8e5a1d34", label: "Sharpnr Court, Koregaon Park (PNQ-KP-02)" },
  { id: "c72f1a49-8b35-4d62-a807-1e9d4b6c3f58", label: "Whitefield Business Hub (BLR-WF-01)" },
  { id: "9d4e8b13-5c72-4f19-b360-7a2c5e9d1f84", label: "Indiranagar Retail Row (BLR-IN-02)" },
  { id: "2a8c6f35-7d91-4b04-8e57-3f1b9a4c6d20", label: "Sharpnr Heights, HSR Layout (BLR-HS-03)" },
  { id: "e51b9d74-3a26-4c98-b1f0-8d7c2e5a9463", label: "Gurgaon Cyber City Tower (DEL-CC-01)" },
  { id: "7c3a5e82-1f47-4d90-a6b3-9e2d8c4f1a56", label: "Sharpnr Arcade, Saket (DEL-SK-02)" },
  { id: "4b9d2c68-8e51-4a37-9c04-6f3a7b1e5d92", label: "Salt Lake Sector V Annexe (CCU-SL-01)" },
];

export const DEMO_CATALOG: PermissionCatalog = [
  {
    type: "Property",
    label: "Properties",
    description: "Buildings and sites the organization manages",
    category: "Operations",
    instances: PROPERTIES,
    actions: [
      {
        name: "canCreateNewProperty",
        label: "Add a new property",
        description: "Register a new building or site",
      },
      {
        name: "canViewProperty",
        label: "View properties",
        description: "See property details",
        requiresInstance: true,
      },
      {
        name: "canEditPropertyDetails",
        label: "Edit property details",
        description: "Change name, address and other details",
        requiresInstance: true,
      },
      {
        name: "canAddBusinessModules",
        label: "Set up business services",
        description: "Turn on hotel, restaurant and similar services",
        requiresInstance: true,
      },
      {
        name: "canAddInfraModules",
        label: "Set up facilities",
        description: "Turn on infrastructure and facility management",
        requiresInstance: true,
      },
    ],
  },
  {
    type: "SentinelRole",
    label: "Roles",
    description: "Job roles and what each one is allowed to do",
    category: "Administration",
    instances: [
      { id: "1c7f3a95-6d28-4b40-9e51-2a8c6f3d7b14", label: "Owner" },
      { id: "8f2d6b41-9c37-4e58-a012-5b7e3a9d6c85", label: "Property Manager" },
      { id: "5a9c1e73-2b84-4d16-8f39-7c4a1d8b5e62", label: "Front Desk" },
      { id: "b3e7d248-1a56-4c90-9d47-8e2f5c1a6b39", label: "Finance" },
    ],
    actions: [
      { name: "canCreateRole", label: "Create roles" },
      { name: "canViewRole", label: "View roles", requiresInstance: true },
      { name: "canEditRole", label: "Rename roles", requiresInstance: true },
      { name: "canDeleteRole", label: "Delete roles", requiresInstance: true },
      {
        name: "canAssignRole",
        label: "Assign roles to people",
        description: "Decide who holds which role",
        requiresInstance: true,
      },
      {
        name: "canAttachPolicyToRole",
        label: "Change what a role can do",
        requiresInstance: true,
      },
      {
        name: "canDetachPolicyFromRole",
        label: "Remove abilities from a role",
        requiresInstance: true,
      },
    ],
  },
  {
    type: "SentinelGroup",
    label: "Groups",
    description: "Teams and departments people belong to",
    category: "Administration",
    instances: [
      { id: "6d1a8c54-3f79-4b02-a5e6-9c7d2b4f1a83", label: "Stakeholders" },
      { id: "c48b2e97-5a13-4d76-8f20-1e6c9a3b5d47", label: "Operations" },
      { id: "9e5c3a71-8b46-4f29-b153-2d8a7c4e6f10", label: "Housekeeping" },
    ],
    actions: [
      { name: "canCreateGroup", label: "Create groups" },
      { name: "canViewGroup", label: "View groups", requiresInstance: true },
      { name: "canEditGroup", label: "Rename groups", requiresInstance: true },
      {
        name: "canDeleteGroup",
        label: "Delete groups",
        requiresInstance: true,
      },
      {
        name: "canManageGroupMembers",
        label: "Add and remove members",
        requiresInstance: true,
      },
    ],
  },
  {
    type: "SentinelPolicy",
    label: "Permission rules",
    description: "The underlying rules that grant access",
    category: "Administration",
    // No instances: authoring rules is not something you scope to one rule.
    actions: [
      { name: "canCreatePolicy", label: "Create permission rules" },
      {
        name: "canViewPolicy",
        label: "View permission rules",
        requiresInstance: true,
      },
      {
        name: "canEditPolicy",
        label: "Edit permission rules",
        requiresInstance: true,
      },
      {
        name: "canDeletePolicy",
        label: "Delete permission rules",
        requiresInstance: true,
      },
      { name: "canEnablePolicy", label: "Turn rules on", requiresInstance: true },
      {
        name: "canDisablePolicy",
        label: "Turn rules off",
        requiresInstance: true,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                Demo roles                                  */
/* -------------------------------------------------------------------------- */

export interface DemoRole {
  id: string;
  name: string;
  actions: string[];
  rules: PermissionRules;
}

const ALL_ACTIONS = DEMO_CATALOG.flatMap((r) => r.actions.map((a) => a.name));

/**
 * Four roles that between them exercise every state the screen can be in:
 * everything granted, a partial type-level grant, a grant restricted to
 * specific properties, and an untouched role.
 */
export const DEMO_ROLES: DemoRole[] = [
  {
    id: "1c7f3a95-6d28-4b40-9e51-2a8c6f3d7b14",
    name: "Owner",
    actions: ALL_ACTIONS,
    rules: {},
  },
  {
    id: "8f2d6b41-9c37-4e58-a012-5b7e3a9d6c85",
    name: "Property Manager",
    actions: [
      "canCreateNewProperty",
      "canViewProperty",
      "canEditPropertyDetails",
      "canAddBusinessModules",
      "canAddInfraModules",
      "canViewRole",
      "canViewGroup",
    ],
    rules: {},
  },
  {
    id: "5a9c1e73-2b84-4d16-8f39-7c4a1d8b5e62",
    name: "Mumbai Regional Manager",
    // The case instance scoping exists for: full property permissions, but only
    // over the Mumbai sites. Note that "Add a new property" stays org-wide —
    // there is no property to pin a create to.
    actions: [
      "canCreateNewProperty",
      "canViewProperty",
      "canEditPropertyDetails",
      "canAddBusinessModules",
    ],
    rules: {
      Property: {
        instances: [
          PROPERTIES[0]!.id,
          PROPERTIES[1]!.id,
          PROPERTIES[2]!.id,
          PROPERTIES[3]!.id,
        ],
        // "…and only during office hours, from the office or the VPN."
        conditions: [
          {
            id: "demo_hours",
            key: "context.isBusinessHours",
            operator: "is",
            values: ["true"],
          },
          {
            id: "demo_network",
            key: "context.network",
            operator: "isOneOf",
            values: ["office", "vpn"],
          },
        ],
      },
    },
  },
  {
    id: "d7b4f291-6c58-4a03-9e17-3f5a8d2c6b94",
    name: "Front Desk",
    actions: ["canViewProperty"],
    rules: { Property: { instances: [PROPERTIES[0]!.id] } },
  },
];

/* -------------------------------------------------------------------------- */
/*                            Restriction palette                             */
/* -------------------------------------------------------------------------- */

/**
 * Keys a restriction can be authored against.
 *
 * The shape of this list is the argument. Every key is either a yes/no or a
 * short closed set, because the engine can compute the hard part on the server:
 *
 *   - "Business hours" instead of making someone do date arithmetic on
 *     `context.requestedAt`.
 *   - "Network: Office / VPN / Elsewhere" instead of asking for a CIDR range.
 *
 * Neither of those keys exists yet. RequestContext today stamps channel, ip,
 * requestedAt and mfaVerified — the two derived ones are a few lines in
 * `RequestContext.CedarKeys()`, and they are what turns "only during office
 * hours from the office" into two clicks instead of an expression.
 *
 * Note `unavailableReason` on the principal keys. The palette in
 * sentinel_contexts advertises department and designation, but the web
 * middleware leaves UserContext zero, so a rule using them can never match —
 * and Cedar skips the whole policy silently rather than erroring anywhere
 * visible. Offering them greyed out with a reason is honest; offering them
 * normally is a trap.
 */
export const DEMO_PALETTE: ConditionPalette = {
  keys: [
    {
      cedar: "context.isBusinessHours",
      label: "Business hours",
      description: "Whether the request arrived during configured office hours",
      type: "bool",
      operators: ["is"],
      group: "The request",
    },
    {
      cedar: "context.network",
      label: "Network",
      description: "Where the request came from",
      type: "string",
      operators: ["is", "isNot", "isOneOf", "isNoneOf"],
      values: [
        { value: "office", label: "Office" },
        { value: "vpn", label: "VPN" },
        { value: "other", label: "Elsewhere" },
      ],
      group: "The request",
    },
    {
      cedar: "context.channel",
      label: "Device",
      description: "Which client the request came from",
      type: "string",
      operators: ["is", "isNot", "isOneOf"],
      values: [
        { value: "web", label: "Web browser" },
        { value: "mobile", label: "Mobile app" },
      ],
      group: "The request",
    },
    {
      cedar: "context.mfaVerified",
      label: "Two-factor verified",
      description: "Whether the session completed two-factor authentication",
      type: "bool",
      operators: ["is"],
      group: "The request",
    },
    {
      cedar: "principal.department",
      label: "Department",
      type: "string",
      operators: ["is", "isNot", "isOneOf", "isNoneOf"],
      values: [
        { value: "Operations", label: "Operations" },
        { value: "Finance", label: "Finance" },
        { value: "Housekeeping", label: "Housekeeping" },
        { value: "Front Office", label: "Front Office" },
      ],
      group: "The person",
      unavailableReason:
        "The login session does not carry the employee's department yet.",
    },
    {
      cedar: "principal.designation",
      label: "Designation",
      type: "string",
      operators: ["is", "isNot", "isOneOf"],
      values: [
        { value: "Manager", label: "Manager" },
        { value: "Supervisor", label: "Supervisor" },
        { value: "Associate", label: "Associate" },
      ],
      group: "The person",
      unavailableReason:
        "The login session does not carry the employee's designation yet.",
    },
  ],
};
