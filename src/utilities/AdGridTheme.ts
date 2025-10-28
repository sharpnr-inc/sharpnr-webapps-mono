import { ClientSideRowModelModule, ModuleRegistry, themeQuartz } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const myTheme = themeQuartz.withParams({
  backgroundColor: "#1f2836",
  browserColorScheme: "dark",
  foregroundColor: "#ffffff",
  borderColor: "#3a3a3a",
  rowBorder: true,
  columnBorder: true,
  headerColumnBorder: true,
});
