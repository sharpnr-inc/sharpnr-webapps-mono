import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface OrgFormData {
  name: string;
  description: string;
  org_operation_type: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  country: string;
  public_contact: string;
  contact_number: string;
  contact_number2: string;
  master_contact: string;
  root_email: string;
  secondary_email: string;
  cin_number: string;
  gst_number: string;
  organization_reg_type: string;
  banker: string;
  bank_acc_number: string;
  ifsc_code: string;
  bank_branch_name: string;
  upi_id: string;
  password: string;
  master_password: string;
}

const initialFormData: OrgFormData = {
  name: "",
  description: "",
  org_operation_type: "HOTEL",
  address: "",
  state: "",
  city: "",
  pincode: "",
  country: "India",
  public_contact: "",
  contact_number: "",
  contact_number2: "",
  master_contact: "",
  root_email: "",
  secondary_email: "",
  cin_number: "",
  gst_number: "",
  organization_reg_type: "PRIVATE_LIMITED",
  banker: "",
  bank_acc_number: "",
  ifsc_code: "",
  bank_branch_name: "",
  upi_id: "",
  password: "",
  master_password: ""
};

const RegisterOrgPage: React.FC = () => {
  const [formData, setFormData] = useState<OrgFormData>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://engine.api.sharpnr.com/api/v1/organisation/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert("Organization registered successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Failed to register organization.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Register Organization</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Organization Name", name: "name" },
          { label: "Description", name: "description" },
          { label: "Operation Type", name: "org_operation_type" },
          { label: "Address", name: "address" },
          { label: "State", name: "state" },
          { label: "City", name: "city" },
          { label: "Pincode", name: "pincode" },
          { label: "Country", name: "country" },
          { label: "Public Contact", name: "public_contact" },
          { label: "Contact Number", name: "contact_number" },
          { label: "Alternate Contact", name: "contact_number2" },
          { label: "Master Contact", name: "master_contact" },
          { label: "Root Email", name: "root_email", type: "email" },
          { label: "Secondary Email", name: "secondary_email", type: "email" },
          { label: "CIN Number", name: "cin_number" },
          { label: "GST Number", name: "gst_number" },
          { label: "Registration Type", name: "organization_reg_type" },
          { label: "Banker", name: "banker" },
          { label: "Bank A/C Number", name: "bank_acc_number" },
          { label: "IFSC Code", name: "ifsc_code" },
          { label: "Branch Name", name: "bank_branch_name" },
          { label: "UPI ID", name: "upi_id" },
          { label: "Password", name: "password", type: "password" },
          { label: "Master Password", name: "master_password", type: "password" }
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof OrgFormData]}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterOrgPage;
