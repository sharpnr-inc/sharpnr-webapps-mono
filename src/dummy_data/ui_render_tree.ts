// ui_render_tree.ts

interface SubSectionAccess {
  [key: string]: boolean;
}

interface Section {
  has_access: boolean;
  sub_section_access: SubSectionAccess;
}

interface SubModuleSection {
  [key: string]: Section;
}

interface Module {
  has_access: boolean;
  sub_module_section: SubModuleSection;
}

interface MainMenuRenderTree {
  [key: string]: Module;
}

export interface UIRendererTree {
  organisation_id: string;
  ui_renderer_tree_id: string;
  orgnisation_business_type: string;
  main_menu_render_tree: MainMenuRenderTree;
}

export const ui_render: UIRendererTree = {
  organisation_id: "",
  ui_renderer_tree_id: "",
  orgnisation_business_type: "hospitality",
  main_menu_render_tree: {
    sharp_hospitality: {
      has_access: true,
      sub_module_section: {
        hotel: {
          has_access: false,
          sub_section_access: {
            overview: true,
            booking: true,
            request: false,
            room_management: true,
          },
        },

        bar: {
          has_access: false,
          sub_section_access: {
            menu: true,
            orders: true,
            inventory: true,
          },
        },

        restaurent: {
          has_access: false,
          sub_section_access: {
            table_management: true,
            orders: true,
            pickup: true,
            reservation_and_booking: true,
          },
        },

        services: {
          has_access: true,
          sub_section_access: {},
        },
        menu: { has_access: true, sub_section_access: {} },
        kitchen: { has_access: true, sub_section_access: {} },
        inventory: { has_access: true, sub_section_access: {} },
        housekeeping: { has_access: true, sub_section_access: {} },
        settings: { has_access: true, sub_section_access: {} },
        orgConfig: { has_access: true, sub_section_access: {} },
      },
    },

  },
};
