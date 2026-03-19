import { useAppForm } from "@/components/forms";

export function DiningSessionPayment() {
  const form = useAppForm({
    defaultValues: {
      dinein_session_id: "",
      payment_method: "",
      customer_name: "",
    },

    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
      <form.AppField
        name="customer_name"
        children={(f) => {
          return <f.TextField label="Customer" />;
        }}
      />
    </div>
  );
}
