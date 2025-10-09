import { useForm } from "@tanstack/react-form";
import { Plus, Trash2, Building2, MapPin, Shield, Landmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CompleteOrgResgistrationSchema, type CompleteOrgResgistrationPayload } from "@/schemas/Auth";

export default function CompleteRegistration() {
  const form = useForm({
    validators: { onBlur: CompleteOrgResgistrationSchema },
    defaultValues: {
      registration_details: {
        is_register: false,
        gst_number: "",
        cin_number: "",
      },
      address_details: {
        city: "",
        state: "",
        pincode: "",
        address_line: "",
        landmark: "",
      },
      bank_details:[],
      owner_details: [],
      super_admin_details: {
        name: "",
      } 
    } as CompleteOrgResgistrationPayload,
    onSubmit: async ({ value }) => {
      console.log("✅ Submitted Complete Registration Data:", value);
    },
  });

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Complete Company Registration</h1>
          <p className="text-gray-500 mt-2">Provide your organization details</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Registration Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <form.Field name="registration_details.is_register">
                {({ state,  handleChange }) => (
                  <div className="flex items-center gap-2 border rounded-lg p-3">
                    <Checkbox
                      checked={state.value}
                      onCheckedChange={(val) => handleChange(!!val)}
                    />
                    <Label>Already Registered?</Label>
                  </div>
                )}
              </form.Field>

              <form.Field name="registration_details.gst_number">
                {({ state, handleBlur, handleChange }) => (
                  <div>
                    <Label>GST Number</Label>
                    <Input
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="registration_details.cin_number">
                {({ state, handleChange }) => (
                  <div>
                    <Label>CIN Number</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>

          {/* Address Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Address Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field name="address_details.address_line">
                {({ state, handleChange }) => (
                  <div className="md:col-span-2">
                    <Label>Address Line</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="address_details.city">
                {({ state, handleChange }) => (
                  <div>
                    <Label>City</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="address_details.state">
                {({ state, handleChange }) => (
                  <div>
                    <Label>State</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="address_details.pincode">
                {({ state, handleChange }) => (
                  <div>
                    <Label>Pincode</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-purple-600" />
                  Bank Details
                </CardTitle>
                <Button
                  type="button"
                  onClick={() =>
                    form.pushFieldValue("bank_details", {
                      bank_name: "",
                      account_number: "",
                      ifsc_code: "",
                      branch_name: "",
                      is_primary: false,
                      is_secondary: false,
                    })
                  }
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Bank
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form.Field name="bank_details" mode="array">
                {({ state }) =>
                  state.value.map((_, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative"
                    >
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => form.removeFieldValue("bank_details", index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <form.Field name={`bank_details[${index}].bank_name`}>
                        {({ state, handleChange }) => (
                          <div>
                            <Label>Bank Name</Label>
                            <Input
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                            />
                          </div>
                        )}
                      </form.Field>

                      <form.Field name={`bank_details[${index}].account_number`}>
                        {({ state, handleChange }) => (
                          <div>
                            <Label>Account Number</Label>
                            <Input
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                            />
                          </div>
                        )}
                      </form.Field>

                      <form.Field name={`bank_details[${index}].ifsc_code`}>
                        {({ state, handleChange }) => (
                          <div>
                            <Label>IFSC Code</Label>
                            <Input
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                            />
                          </div>
                        )}
                      </form.Field>

                      <form.Field name={`bank_details[${index}].branch_name`}>
                        {({ state, handleChange }) => (
                          <div>
                            <Label>Branch Name</Label>
                            <Input
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                            />
                          </div>
                        )}
                      </form.Field>

                      <div className="flex items-center gap-4 md:col-span-2">
                        <form.Field name={`bank_details[${index}].is_primary`}>
                          {({ state, handleChange }) => (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={state.value}
                                onCheckedChange={(val) => handleChange(!!val)}
                              />
                              <Label>Primary Account</Label>
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`bank_details[${index}].is_secondary`}>
                          {({ state, handleChange }) => (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={state.value}
                                onCheckedChange={(val) => handleChange(!!val)}
                              />
                              <Label>Secondary Account</Label>
                            </div>
                          )}
                        </form.Field>
                      </div>
                    </div>
                  ))
                }
              </form.Field>
            </CardContent>
          </Card>

          {/* Owner Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  Owner Details
                </CardTitle>
                <Button
                  type="button"
                  onClick={() =>
                    form.pushFieldValue("owner_details", {
                      owner_name: "",
                      owner_email: "",
                      owner_phone: "",
                    })
                  }
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Owner
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form.Field name="owner_details" mode="array">
                {({ state }) =>
                  state.value.map((_, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative"
                    >
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => form.removeFieldValue("owner_details", index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <form.Field name={`owner_details[${index}].owner_name`}>
                        {({ state, handleChange }) => (
                          <div>
                            <Label>Owner Name</Label>
                            <Input
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                            />
                          </div>
                        )}
                      </form.Field>

                      <form.Field name={`owner_details[${index}].owner_email`}>
                        {({ state, handleChange }) => (
                          <div>
                            <Label>Owner Email</Label>
                            <Input
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                            />
                          </div>
                        )}
                      </form.Field>

                      <form.Field name={`owner_details[${index}].owner_phone`}>
                        {({ state, handleChange }) => (
                          <div>
                            <Label>Owner Phone</Label>
                            <Input
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                            />
                          </div>
                        )}
                      </form.Field>
                    </div>
                  ))
                }
              </form.Field>
            </CardContent>
          </Card>

          {/* Super Admin */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Super Admin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form.Field name="super_admin_details.name">
                {({ state, handleChange }) => (
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white">
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}