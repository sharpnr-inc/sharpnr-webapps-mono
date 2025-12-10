import type { MenuTerminalState } from "./menuTerminal.types";

export const selectMenuGroupId = (s:MenuTerminalState)=>s.selectedMenuGroupId;

export const selectCategoryId = (s:MenuTerminalState)=>s.selectedSubCategoryId;