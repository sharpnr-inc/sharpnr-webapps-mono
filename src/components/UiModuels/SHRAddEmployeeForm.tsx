import { useState } from "react";
import { Button } from "@/components/ui/button";
// This component can use only for the Online Employee
export function SHAAddEmployeeForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-4 w-full max-w-lg">
      {/* Step Indicator */}
      <div className="flex justify-between mb-4">
        <span className={`font-semibold ${step === 1 ? "text-blue-500" : ""}`}>1. Check Email</span>
        <span className={`font-semibold ${step === 2 ? "text-blue-500" : ""}`}>2. Add Details</span>
        <span className={`font-semibold ${step === 3 ? "text-blue-500" : ""}`}>3. Add Privileges</span>
      </div>

      {/* Step Content */}
      <div className="border p-4 rounded-md mb-4">
        {step === 1 && (
          <div>
            <label className="block mb-2 font-medium">Employee Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border p-2 rounded mb-2"
            />
            <label className="block mb-2 font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block mb-2 font-medium">Privileges</label>
            <select className="w-full border p-2 rounded">
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          disabled={step === 1}
          className="bg-gray-300 text-black"
        >
          Back
        </Button>

        {step < 3 ? (
          <Button onClick={nextStep} className="bg-blue-500 text-white">
            Next
          </Button>
        ) : (
          <Button
            onClick={() => alert("Employee Added!")}
            className="bg-green-500 text-white"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
