// ui_render_tree.ts

interface ModuleFeatures {
  [key: string]: boolean;
}

interface SharpModules {
  [key: string]: ModuleFeatures | {};
}

interface MainMenuRenderTree {
  [key: string]: ModuleFeatures;
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
    hotel: {
      overview: true,
      booking: true,
      request: true,
    },
    bar: {
      overview: true,
      booking: true,
      request: true,
    },
    service: {
      overview: true,
      booking: true,
      request: true,
    },
    restaurant: {
      overview: true,
      booking: true,
      request: true,
    },
    menu: {
      overview: true,
      booking: true,
      request: true,
    },
  },
};