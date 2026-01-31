import { createFormHook } from "@tanstack/react-form";
import TextField from "./fieldcomps/text-field";
import { fieldContext, formContext } from "./form-context";
import TextAreaField from "./fieldcomps/text-area-field";
import SelectField from "./fieldcomps/select-field";
import SubmitButton from "./SubmitBottom";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextAreaField,
    SelectField,
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext,
});
