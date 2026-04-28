import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

export default function HRRecruitmentAddEmployeePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [hasOnlineAccess, setHasOnlineAccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="p-4 mx-auto space-y-10">
      <FieldSet className="space-y-6 border rounded-xl shadow-sm p-6">
        <FieldLegend className="text-2xl font-semibold text-gray-800">
          Add New Employee
        </FieldLegend>
        <FieldDescription className="text-gray-500">
          Fill out all employee details carefully.
        </FieldDescription>

        {/* === Profile Image Upload === */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>

          <label
            htmlFor="profileImage"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow-sm"
          >
            Upload Image
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* === Employee Type Selection === */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <FieldLegend>Employee Access Type</FieldLegend>
            <FieldDescription className="text-gray-500">
              Choose whether this employee can log in to the online system.
            </FieldDescription>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="accessSwitch"
              checked={hasOnlineAccess}
              onCheckedChange={setHasOnlineAccess}
            />
            <FieldLabel htmlFor="accessSwitch" className="cursor-pointer">
              {hasOnlineAccess
                ? "Online Access Enabled"
                : "Record-Keeping Only"}
            </FieldLabel>
          </div>
        </div>

        {/* === Basic Info === */}
        <div>
          <FieldLegend>Basic Information</FieldLegend>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input id="fullName" placeholder="e.g. Aarav Sharma" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="e.g. aarav@example.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" type="tel" placeholder="+91 9876543210" />
            </Field>

            <Field>
              <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
              <Input id="dob" type="date" />
            </Field>

            <Field>
              <FieldLabel htmlFor="maritalStatus">Marital Status</FieldLabel>
              <select
                id="maritalStatus"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
            </Field>
          </FieldGroup>
        </div>

        {/* === Conditionally Render Online Access Section === */}
        {hasOnlineAccess && (
          <div>
            <FieldLegend>Online Access Credentials</FieldLegend>
            <FieldDescription>
              These credentials will be used by the employee to log into the
              system.
            </FieldDescription>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" placeholder="e.g. aarav.sharma" />
                <FieldError>Username already taken.</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" placeholder="••••••••" />
              </Field>
            </FieldGroup>
          </div>
        )}

        {/* === Address Section === */}
        <div>
          <FieldLegend>Address</FieldLegend>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="address">Residential Address</FieldLabel>
              <Textarea
                id="address"
                placeholder="e.g. 123 MG Road, Bengaluru, Karnataka, India"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" placeholder="e.g. Bengaluru" />
            </Field>
            <Field>
              <FieldLabel htmlFor="state">State</FieldLabel>
              <Input id="state" placeholder="e.g. Karnataka" />
            </Field>
            <Field>
              <FieldLabel htmlFor="pincode">Pin Code</FieldLabel>
              <Input id="pincode" placeholder="e.g. 560001" />
            </Field>
            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input id="country" placeholder="e.g. India" />
            </Field>
          </FieldGroup>
        </div>

        {/* === Bank Account Details === */}
        <div>
          <FieldLegend>Bank Account Details</FieldLegend>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field>
              <FieldLabel htmlFor="bankName">Bank Name</FieldLabel>
              <Input id="bankName" placeholder="e.g. HDFC Bank" />
            </Field>
            <Field>
              <FieldLabel htmlFor="accountNumber">Account Number</FieldLabel>
              <Input id="accountNumber" placeholder="e.g. 1234567890" />
            </Field>
            <Field>
              <FieldLabel htmlFor="ifsc">IFSC Code</FieldLabel>
              <Input id="ifsc" placeholder="e.g. HDFC0001234" />
            </Field>
            <Field>
              <FieldLabel htmlFor="branch">Branch</FieldLabel>
              <Input id="branch" placeholder="e.g. MG Road" />
            </Field>
          </FieldGroup>
        </div>

        {/* === UAN / PF Account === */}
        <div>
          <FieldLegend>UAN / PF Account Details</FieldLegend>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field>
              <FieldLabel htmlFor="uan">UAN Number</FieldLabel>
              <Input id="uan" placeholder="e.g. 100987654321" />
            </Field>
            <Field>
              <FieldLabel htmlFor="pfNumber">PF Account Number</FieldLabel>
              <Input id="pfNumber" placeholder="e.g. DL/12345/67890" />
            </Field>
          </FieldGroup>
        </div>

        {/* === Emergency Contact === */}
        <div>
          <FieldLegend>Emergency Contact</FieldLegend>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field>
              <FieldLabel htmlFor="emergencyName">Name</FieldLabel>
              <Input id="emergencyName" placeholder="e.g. Priya Sharma" />
            </Field>
            <Field>
              <FieldLabel htmlFor="relation">Relationship</FieldLabel>
              <Input id="relation" placeholder="e.g. Wife" />
            </Field>
            <Field>
              <FieldLabel htmlFor="emergencyPhone">Phone Number</FieldLabel>
              <Input
                id="emergencyPhone"
                type="tel"
                placeholder="+91 9876543210"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="emergencyEmail">Email</FieldLabel>
              <Input
                id="emergencyEmail"
                type="email"
                placeholder="priya@example.com"
              />
            </Field>
          </FieldGroup>
        </div>

        {/* === Education === */}
        <div>
          <FieldLegend>Education Details</FieldLegend>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field>
              <FieldLabel htmlFor="qualification">
                Highest Qualification
              </FieldLabel>
              <Input
                id="qualification"
                placeholder="e.g. B.Tech in Computer Science"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="university">
                University / Institute
              </FieldLabel>
              <Input id="university" placeholder="e.g. IIT Delhi" />
            </Field>
            <Field>
              <FieldLabel htmlFor="yearOfPassing">Year of Passing</FieldLabel>
              <Input id="yearOfPassing" type="number" placeholder="e.g. 2021" />
            </Field>
            <Field>
              <FieldLabel htmlFor="grade">Grade / Percentage</FieldLabel>
              <Input id="grade" placeholder="e.g. 8.5 CGPA" />
            </Field>
          </FieldGroup>
        </div>

        {/* === Submit === */}
        <div className="flex justify-end mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md">
            Save Employee
          </Button>
        </div>
      </FieldSet>
    </div>
  );
}
