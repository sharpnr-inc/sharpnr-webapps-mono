import { createFormHook } from "@tanstack/react-form";
import TextField from "./fieldcomps/text-field";
import { fieldContext, formContext } from "./form-context";
import TextAreaField from "./fieldcomps/text-area-field";
import SelectField from "./fieldcomps/select-field";
import SubmitButton from "./SubmitBottom";
import CountrySelect from "./fieldcomps/select-country-field";
import StateSelect from "./fieldcomps/select-state-field";
import CitySelect from "./fieldcomps/select-cities-field";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    TextAreaField,
    SelectField,
    CountrySelect,
    StateSelect,
    CitySelect
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext,
});
