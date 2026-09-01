import { Separator } from "@sharpnr/ui";
import { GeneratedPreview } from "./components/GeneratedPreview";
import { MatrixFooter } from "./components/MatrixFooter";
import { MatrixGroups } from "./components/MatrixGroups";
import { MatrixToolbar } from "./components/MatrixToolbar";
import { PermissionMatrixRoot } from "./components/PermissionMatrixRoot";

export type { PermissionMatrixProps } from "./components/PermissionMatrixRoot";
export type { PermissionMatrixContextValue } from "./context";

/* -------------------------------------------------------------------------- */
/*                              Compound export                               */
/* -------------------------------------------------------------------------- */

const PermissionMatrix = Object.assign(PermissionMatrixRoot, {
  Toolbar: MatrixToolbar,
  Groups: MatrixGroups,
  Footer: MatrixFooter,
  Preview: GeneratedPreview,
  Separator,
});

export default PermissionMatrix;
