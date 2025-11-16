import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";

export default function RestaurantConfigGeneral({dta}:{dta:any}) {
  console.log(dta.data)
  const form = useForm({
    defaultValues: {
      display_name: dta.display_name,
      legal_display_name: "Dearie hospitality PVT LTD",
      contact_number: "9828823314",
      address:"",
      state:"",
      city:"",
      pincode:"",
      
    },
  });

  return (
    <Card className="p-4">
       <Input value={dta.id} placeholder={dta.data.id} disabled/>
      <CardHeader>
        <CardTitle>General Configuration</CardTitle>
        <CardDescription>
          Edit or View General details for the Restaurant
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="grid grid-cols-4 gap-2">
         
          <div>
            <form.Field
              name="display_name"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>

          <div>
            <form.Field
              name="legal_display_name"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Legal Name</Label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>

          <div>
            <form.Field
              name="contact_number"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Contact</Label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>
        </CardContent>
    
      </form>
    </Card>
  );
}
