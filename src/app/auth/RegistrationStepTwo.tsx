"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, MapPin, Landmark, User, Shield, Trash2 } from "lucide-react";

export default function CompanyRegistration() {
  const [formData, setFormData] = useState({
    registration_details: {
      is_register: false,
      gst_number: "",
      cin_number: "",
    },
    address_details: {
      address_line: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
    bank_details: [
      {
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        branch_name: "",
        is_primary: false,
        is_secondary: false,
      },
    ],
    owner_details: [
      {
        owner_name: "",
        owner_email: "",
        owner_phone: "",
      },
    ],
    super_admin_details: {
      name: "",
    },
  });

  const handleChange = (path:any, value:any) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const updated = { ...prev };
      let nested:any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleAddBank = () => {
    setFormData((prev) => ({
      ...prev,
      bank_details: [
        ...prev.bank_details,
        {
          bank_name: "",
          account_number: "",
          ifsc_code: "",
          branch_name: "",
          is_primary: false,
          is_secondary: false,
        },
      ],
    }));
  };

  const handleRemoveBank = (idx:any) => {
    if (formData.bank_details.length > 1) {
      setFormData((prev) => ({
        ...prev,
        bank_details: prev.bank_details.filter((_, i) => i !== idx),
      }));
    }
  };

  const handleAddOwner = () => {
    setFormData((prev) => ({
      ...prev,
      owner_details: [
        ...prev.owner_details,
        {
          owner_name: "",
          owner_email: "",
          owner_phone: "",
        },
      ],
    }));
  };

  const handleRemoveOwner = (idx:any) => {
    if (formData.owner_details.length > 1) {
      setFormData((prev) => ({
        ...prev,
        owner_details: prev.owner_details.filter((_, i) => i !== idx),
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Submitted DTO:", formData);
    alert("Registration data logged to console ✅");
  };

  const handleReset = () => {
    setFormData({
      registration_details: {
        is_register: false,
        gst_number: "",
        cin_number: "",
      },
      address_details: {
        address_line: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
      },
      bank_details: [
        {
          bank_name: "",
          account_number: "",
          ifsc_code: "",
          branch_name: "",
          is_primary: false,
          is_secondary: false,
        },
      ],
      owner_details: [
        {
          owner_name: "",
          owner_email: "",
          owner_phone: "",
        },
      ],
      super_admin_details: {
        name: "",
      },
    });
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-5 place-content-center text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
           <div>
          <h1 className="text-2xl font-bold mb-2">
            Company Registration
          </h1>
          <p className="text-lg opacity-70">
            Complete your registration to get started
          </p>

         </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl">Registration Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 rounded-lg border">
                  <Checkbox
                    id="is_register"
                    checked={formData.registration_details.is_register}
                    onCheckedChange={(val) =>
                      handleChange("registration_details.is_register", !!val)
                    }
                  />
                  <Label htmlFor="is_register" className="font-medium cursor-pointer">
                    Already Registered?
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">GST Number</Label>
                  <Input
                    placeholder="Enter GST number"
                    value={formData.registration_details.gst_number}
                    onChange={(e) =>
                      handleChange("registration_details.gst_number", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">CIN Number</Label>
                  <Input
                    placeholder="Enter CIN number"
                    value={formData.registration_details.cin_number}
                    onChange={(e) =>
                      handleChange("registration_details.cin_number", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl">Address Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-semibold">Address Line</Label>
                  <Input
                    placeholder="Enter complete address"
                    value={formData.address_details.address_line}
                    onChange={(e) =>
                      handleChange("address_details.address_line", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Landmark</Label>
                  <Input
                    placeholder="Nearby landmark"
                    value={formData.address_details.landmark}
                    onChange={(e) =>
                      handleChange("address_details.landmark", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">City</Label>
                  <Input
                    placeholder="City name"
                    value={formData.address_details.city}
                    onChange={(e) =>
                      handleChange("address_details.city", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">State</Label>
                  <Input
                    placeholder="State name"
                    value={formData.address_details.state}
                    onChange={(e) =>
                      handleChange("address_details.state", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Pincode</Label>
                  <Input
                    placeholder="6-digit pincode"
                    value={formData.address_details.pincode}
                    onChange={(e) =>
                      handleChange("address_details.pincode", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">Bank Details</CardTitle>
                </div>
                <Button
                  type="button"
                  onClick={handleAddBank}
                  className="bg-purple-600 hover:bg-purple-700"
                  size="sm"
                >
                  + Add Bank
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {formData.bank_details.map((bank, idx) => (
                <div key={idx} className="relative border-2 p-6 rounded-xl hover:border-purple-400 transition-colors">
                  {formData.bank_details.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-4 right-4"
                      onClick={() => handleRemoveBank(idx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Bank Name</Label>
                      <Input
                        placeholder="Bank name"
                        value={bank.bank_name}
                        onChange={(e) =>
                          handleChange(`bank_details.${idx}.bank_name`, e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Account Number</Label>
                      <Input
                        placeholder="Account number"
                        value={bank.account_number}
                        onChange={(e) =>
                          handleChange(`bank_details.${idx}.account_number`, e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">IFSC Code</Label>
                      <Input
                        placeholder="IFSC code"
                        value={bank.ifsc_code}
                        onChange={(e) =>
                          handleChange(`bank_details.${idx}.ifsc_code`, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">Owner Details</CardTitle>
                </div>
                <Button
                  type="button"
                  onClick={handleAddOwner}
                  className="bg-orange-600 hover:bg-orange-700"
                  size="sm"
                >
                  + Add Owner
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {formData.owner_details.map((owner, idx) => (
                <div key={idx} className="relative border-2 p-6 rounded-xl hover:border-orange-400 transition-colors">
                  {formData.owner_details.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-4 right-4"
                      onClick={() => handleRemoveOwner(idx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Owner Name</Label>
                      <Input
                        placeholder="Full name"
                        value={owner.owner_name}
                        onChange={(e) =>
                          handleChange(`owner_details.${idx}.owner_name`, e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Owner Email</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={owner.owner_email}
                        onChange={(e) =>
                          handleChange(`owner_details.${idx}.owner_email`, e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Owner Phone</Label>
                      <Input
                        placeholder="Phone number"
                        value={owner.owner_phone}
                        onChange={(e) =>
                          handleChange(`owner_details.${idx}.owner_phone`, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl">Super Admin Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Name</Label>
                <Input
                  placeholder="Super admin name"
                  value={formData.super_admin_details.name}
                  onChange={(e) =>
                    handleChange("super_admin_details.name", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="font-semibold"
            >
              Reset Form
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
            >
              Complete Registration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}