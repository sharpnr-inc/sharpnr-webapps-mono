import { createFormHook } from "@tanstack/react-form";
import TextField from "./fieldcomps/text-field";
import { fieldContext, formContext } from "./form-context";
import TextAreaField from "./fieldcomps/text-area-field";
import SelectField from "./fieldcomps/select-field";
import SubmitButton from "./SubmitBottom";
import NumberField from "./fieldcomps/number_field";
import CheckboxField from "./fieldcomps/checkbox-field";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    TextAreaField,
    SelectField,
    NumberField,
    CheckboxField,
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext,
});
