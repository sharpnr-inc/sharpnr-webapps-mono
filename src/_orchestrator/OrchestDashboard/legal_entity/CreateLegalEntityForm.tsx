import { useAppForm } from "@/components/forms";

interface CreateLegalEntityFormProps {}

const CreateLegalEntityForm: React.FC<CreateLegalEntityFormProps> = () => {
  const form = useAppForm({
    defaultValues: {
      name: "",
      gst_number: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Legal Entity Name" />}
        />

        <form.AppField
          name="gst_number"
          children={(field) => <field.TextField label="Legal Entity GST" />}
        />
        
      </form>
    </>
  );
};

export default CreateLegalEntityForm;
