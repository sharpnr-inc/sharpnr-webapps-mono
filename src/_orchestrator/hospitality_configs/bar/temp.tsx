import { useAppForm } from "@/components/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TempProps {}

const TempComps: React.FC<TempProps> = () => {
  const form = useAppForm({
    defaultValues: {
      address_line: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
    onSubmit: ({ value }) => console.log(value),
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Testing component</CardTitle>
            <CardDescription>Just testing this component</CardDescription>
          </CardHeader>
          <CardContent>
            <form.AppField
              name="address_line"
              children={(f) => <f.TextAreaField label="Address line" />}
            />

            <form.AppField
              name="country"
              children={(f) => <f.CountrySelect />}
            />

            <form.AppField name="state" children={(f) => <f.StateSelect />} />

            <form.AppField name="city" children={(f) => <f.CitySelect />} />
          </CardContent>
          <CardFooter>
            <form.AppForm>
              <form.SubmitButton>Submit</form.SubmitButton>
            </form.AppForm>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default TempComps;
