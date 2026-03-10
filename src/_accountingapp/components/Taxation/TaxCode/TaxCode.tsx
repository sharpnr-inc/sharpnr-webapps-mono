import { CodesDetails } from "./CodeDetails";
import { Codes } from "./Codes";
import { TaxCodeRoot } from "./TaxCodeRoot";

const TaxCode = Object.assign(TaxCodeRoot, {
  Codes,
  CodesDetails,
});

export default TaxCode;
