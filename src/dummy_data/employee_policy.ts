export type AccessLevel = "FULL" | "PARTIAL" | "NONE";
export type Action = "READ" | "WRITE" | "EDIT" | "DELETE";
export interface ModuleAccess {
  Access: AccessLevel;
  [resource: string]: AccessLevel | Action[];
}

export interface EmployeePrivileges {
  [module: string]: ModuleAccess;
}

export interface EmployeePolicy {
  EmployeeID: string;
  Privilages: EmployeePrivileges;
}

export const employee_policy: any = {
  EmployeeID: "nvwohnwieh-wnseinn-2387273-cub",

  Privilages: {
    sharp_hospitality: {
      module_access: "FULL",
      sections: {
        hotel: {
          overview: "DELETE",
          booking: "DELETE",
          request: "DELETE",
          room_management: "DELETE",
        },
        bar: {
          menu: "DELETE",
          orders: "DELETE",
          inventory: "DELETE",
          staff: "DELETE",
        },

        restaurant: {
          table_management: "",
          orders: "",
          pickup: "",
          reservation_booking: "",
        },
        service: {
          running_service: "",
          order_status: "",
          assigned: "",
          upcomming: "",
        },
        menu: {
          bar_menu: "",
          hotel_menu: "",
          restaurant_menu: "",
        },
        kitchen: {
          orders: "",
          menu: "",
          inventory: "",
          staff: "",
        },
        inventory: {
          bar_inventory: "",
          hotel_inventory: "",
          restaurant_inventory: "",
          kitchen_inventory: "",
          genral_inventory: "",
        },
        house_keeping: {},
        settings: {},
        org_config: {},
      },
    },

    sharp_accounting: {
      Access: "PARTIAL",
      transactions: ["READ"],
      invoice: ["READ", "WRITE", "DELETE"],
    },

    sharp_hr: {
      Access: "NONE",
    },
    
    sharp_marketing: {
      Access: "NONE",
    },
  },
};
