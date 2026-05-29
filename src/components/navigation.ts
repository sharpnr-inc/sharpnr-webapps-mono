export interface ProductNavigationItems {
  name: string;
  description: string;
  href: string;
  features: string[];
}

export interface ProductNavigation {
  items: ProductNavigationItems[];
}

export const ProductsNavigation: ProductNavigation = {
  items: [
    {
      name: "Sharp Hospitality",
      description:
        "Hotels, restaurants, bars, and venues, manage them all in one place.",
      href: "#",
      features: [
        "Reservations",
        "Table management",
        "Menu management",
        "Staff scheduling",
        "Customer loyalty",
      ],
    },
    {
      name: "Sharp-Accounting",
      description: "Double-entry accounting and financial reporting.",
      href: "#",
      features: [
        "General ledger",
        "Accounts payable/receivable",
        "Financial reporting",
      ],
    },
  ],
};

/* --------------------------------- <***> --------------------------------- */

export interface ServicesNavigationItems {
  service: string;
  description: string;
  appName: string;
}

export interface ServicesNavigation {
  items: ServicesNavigationItems[];
}

export const ServicesNavigation: ServicesNavigation = {
  items: [
    {
      service: "Restaurant Management",
      description:
        "Manage reservations, table assignments, and staff scheduling with Sharp Hospitality. Our all-in-one solution streamlines operations for restaurants of all sizes. with multi floor and multi-venue support, Sharp Hospitality is the perfect choice for restaurants looking to optimize their operations and enhance the customer experience. create as many kitchens and distribute orders across them, all while keeping track of inventory and staff performance.",
      appName: "Sharp Hospitality",
    },

    {
      service: "Hotel Management",
      description:
        "Manage reservations, table assignments, and staff scheduling with Sharp Hospitality. Our all-in-one solution streamlines operations for restaurants of all sizes. with multi floor and multi-venue support, Sharp Hospitality is the perfect choice for restaurants looking to optimize their operations and enhance the customer experience. create as many kitchens and distribute orders across them, all while keeping track of inventory and staff performance.",
      appName: "Sharp Hospitality",
    },

    {
      service: "Bar Management",
      description:
        "Manage reservations, table assignments, and staff scheduling with Sharp Hospitality. Our all-in-one solution streamlines operations for restaurants of all sizes. with multi floor and multi-venue support, Sharp Hospitality is the perfect choice for restaurants looking to optimize their operations and enhance the customer experience. create as many kitchens and distribute orders across them, all while keeping track of inventory and staff performance.",
      appName: "Sharp Hospitality",
    },
    {
      service: "Venue Management",
      description:
        "Manage reservations, table assignments, and staff scheduling with Sharp Hospitality. Our all-in-one solution streamlines operations for restaurants of all sizes. with multi floor and multi-venue support, Sharp Hospitality is the perfect choice for restaurants looking to optimize their operations and enhance the customer experience. create as many kitchens and distribute orders across them, all while keeping track of inventory and staff performance.",
      appName: "Sharp Hospitality",
    },
    {
      service: "Accounting",
      description:
        "Sharp-Accounting is a comprehensive accounting software designed to simplify financial management for businesses of all sizes. With features like double-entry accounting, accounts payable/receivable, and financial reporting, Sharp-Accounting provides a robust solution for managing your finances efficiently and accurately. Whether you're a small business owner or a large enterprise, Sharp-Accounting offers the tools you need to stay on top of your financials and make informed decisions.",
      appName: "Sharp-Accounting",
    },

    {
      service: "Financial Reporting",
      description:
        "Sharp-Accounting is a comprehensive accounting software designed to simplify financial management for businesses of all sizes. With features like double-entry accounting, accounts payable/receivable, and financial reporting, Sharp-Accounting provides a robust solution for managing your finances efficiently and accurately. Whether you're a small business owner or a large enterprise, Sharp-Accounting offers the tools you need to stay on top of your financials and make informed decisions.",
      appName: "Sharp-Accounting",
    },
  ],
};

/* --------------------------------- <***> --------------------------------- */

export interface IndustriesNavigationItems {
  industry: string;
  description: string;
  appName: string;
  supportedSubIndustries: string[];
  supportedBusinesOps: string[];
}

export interface IndustriesNavigation {
  items: IndustriesNavigationItems[];
}

export const IndustriesNavigation: IndustriesNavigation = {
  items: [
    {
      industry: "Hospitality",
      description:
        "Sharp Hospitality covers the full spectrum — from boutique hotels to large casino resorts.",
      appName: "Sharp Hospitality",
      supportedSubIndustries: [
        "Hotels",
        "Restaurants",
        "Bars",
        "Venues",
        "Nightclubs",
        "Casinos",
        "Spas",
        "Resorts",
        "Cruise Lines",
        "Event Spaces",
      ],
      supportedBusinesOps: [
        "Reservations",
        "Table management",
        "Menu management",
        "Staff scheduling",
        "Customer loyalty",
      ],
    },
  ],
};
