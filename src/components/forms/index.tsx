import { createFormHook } from "@tanstack/react-form";
import TextField from "./fieldcomps/text-field";
import { fieldContext, formContext } from "./form-context";
import TextAreaField from "./fieldcomps/text-area-field";
import SelectField from "./fieldcomps/select-field";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextAreaField,
    SelectField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
