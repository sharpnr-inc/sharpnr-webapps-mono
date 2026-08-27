import { Separator } from "@sharpnr/ui";
import { Action } from "./components/Action";
import { Conditions } from "./components/Conditions";
import { Description } from "./components/Description";
import { EffectField } from "./components/EffectField";
import { Metadata } from "./components/Metadata";
import { Name } from "./components/Name";
import { PolicyBuilderRoot } from "./components/PolicyBuilderRoot";
import { Preview } from "./components/Preview";
import { Principal } from "./components/Principal";
import { Resource } from "./components/Resource";
import { Scope } from "./components/Scope";

export type { PolicyBuilderProps } from "./components/PolicyBuilderRoot";
export type { PolicyBuilderContextValue } from "./context";

/* -------------------------------------------------------------------------- */
/*                              Compound export                               */
/* -------------------------------------------------------------------------- */

const PolicyBuilder = Object.assign(PolicyBuilderRoot, {
  Metadata,
  Name,
  Effect: EffectField,
  Description,
  Scope,
  Principal,
  Action,
  Resource,
  Conditions,
  Separator,
  Preview,
});

export default PolicyBuilder;
