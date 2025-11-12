import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";

export default function ORGConfigSection() {
  useEffect(() => {}, []);

  const form = useForm({
    defaultValues: {
      org_sharpnr_id: "SHA56584BDTH870",
      org_name: "XYZ hospitality PVT LTD",
      org_address: "Jothwara Jaipur",
      city: "Jaipur",
      org_gst: "",
      org_cin_number: "",
      org_kitchen_isOnline: true,
      org_kitchen_id: "",
      org_type: "HOSPITALITY",
      org_module: ["utyd", "etgrg"],
    },
    onSubmit: ({ value }) => {
      console.log("✅ Submitted values:", value);
    },
  });

  return (
    <div className="space-y-2">
      <Alert variant="warning">
        <AlertTitle>About ORG Section</AlertTitle>
        <AlertDescription>
          <p>
            The <strong>ORG</strong> serves as an <strong>orchestrator</strong>{" "}
            for your business. It can store common details — including{" "}
            <strong>legal information</strong> — that can be shared across all
            units such as Restaurants, Hotels, or Bars. Each unit can also
            maintain its own independent details, payment methods, and bank
            accounts if needed. In short, the ORG helps centralize shared data
            while allowing flexibility for individual units.
          </p>
        </AlertDescription>
      </Alert>

      <form onSubmit={form.handleSubmit}>
        <Card>
          <CardContent className="flex flex-col gap-2.5">
            <div className="space-y-2">
              <div className=" flex flex-auto flex-wrap gap-4">
                <form.Field
                  name="org_sharpnr_id"
                  children={(field) => (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Sharpnr ID
                      </label>
                      <Input disabled value={field.state.value} />
                    </div>
                  )}
                />

                <form.Field
                  name="org_type"
                  children={(field) => (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Organization Type
                      </label>
                      <Input
                        disabled
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <Separator></Separator>

            <div className="grid grid-cols-3 gap-4">
              <form.Field
                name="org_name"
                children={(field) => (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Organization Name
                    </label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name="org_gst"
                children={(field) => (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Organization GST Number
                    </label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />

              <form.Field
                name="org_cin_number"
                children={(field) => (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Organization CIN Number
                    </label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </div>
            <Separator></Separator>

            <div className="space-y-3">
              <div>Address Details</div>
              <div className="space-y-2">
                <form.Field
                  name="org_address"
                  children={(field) => (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address Line
                      </label>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
                <div className="grid grid-cols-3 gap-4 ">
                  <form.Field
                    name="org_address"
                    children={(field) => (
                      <div>
                        <Label className="block text-sm font-medium mb-1">
                          Address Line
                        </Label>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />

                  <form.Field
                    name="org_address"
                    children={(field) => (
                      <div>
                        <Label className="block text-sm font-medium mb-1">
                          Address Line
                        </Label>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />

                  <form.Field
                    name="org_address"
                    children={(field) => (
                      <div>
                        <Label className="block text-sm font-medium mb-1">
                          Address Line
                        </Label>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />

                  <form.Field
                    name="org_address"
                    children={(field) => (
                      <div>
                        <Label className="block text-sm font-medium mb-1">
                          Address Line
                        </Label>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
          <CardDescription>Details of Bank Account</CardDescription>{" "}
        </CardHeader>
        <CardContent>
          <div>here we will be details of payment integration</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Integrations</CardTitle>
          <CardDescription>
            Details of Payments integration
          </CardDescription>{" "}
        </CardHeader>
        <CardContent>
          <div>here we will be details of payment integration</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kitchen</CardTitle>{" "}
          <CardDescription>
            Since Your Organization is fall in Hospitality Segment it have the
            Default Kitchen{" "}
          </CardDescription>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-2">
                <Label className="text-base font-medium">Kitchen</Label>
                <Alert variant="warning" className="p-3">
                  <AlertTitle className="text-sm font-semibold">
                    Turn On/Off Kitchen
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground">
                    Turning this switch off will make the kitchen unavailable
                    across the entire Business Unit.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="flex items-center pl-4">
                <Switch />
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modules/Business Units</CardTitle>
          <CardDescription>
            Here are details of the Modules/Business Units of Business
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div>Hotel</div>
            <div>
              <Label>Hotel Name</Label>
              <Input></Input>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
