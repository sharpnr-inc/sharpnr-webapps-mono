"use client";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useState } from "react";
import { UserRoundPlus, CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { useFormsModal } from "@/context/FormModalContext";

export default function EmployeeOnBoardingSection() {
  const [requests] = useState([
    {
      id: 1,
      name: "Kashif Nawaz",
      email: "kashif.nawaz@example.com",
      phone: "+91 9876543210",
      position: "Frontend Developer",
      department: "Engineering",
      dob: "1996-08-15",
      maritalStatus: "Single",
      address: "123 MG Road, Bengaluru, India",
      bankName: "HDFC Bank",
      accountNumber: "1234567890",
      ifsc: "HDFC0001234",
      qualification: "B.Tech in Computer Science",
      university: "IIT Delhi",
      uan: "100987654321",
      pfNumber: "DL/12345/67890",
    },
  ]);

  const { showModal } = useFormsModal();

  const handleViewDetails = (employee: any) => {
    showModal(
      `Onboarding Review - ${employee.name}`,
      "Please review the employee details and approve or decline the onboarding request.",
      <RequestDetails employee={employee} />
    );
  };

  return (
    <div className="p-4">
      {requests.length === 0 ? (
        <Empty className="max-w-lg mx-auto">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserRoundPlus className="w-12 h-12 text-blue-500" />
            </EmptyMedia>
            <EmptyTitle>No Onboarding Requests</EmptyTitle>
            <EmptyDescription>
              It looks like there are no onboarding requests at the moment.
              Once new employees are added, their onboarding progress will
              appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((emp) => (
            <Card key={emp.id} className="hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/avatar.png" alt={emp.name} />
                    <AvatarFallback>
                      {emp.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{emp.name}</CardTitle>
                    <CardDescription>{emp.position}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Department: <b>{emp.department}</b>
                </p>
                <p className="text-sm text-gray-600">Phone: {emp.phone}</p>
                <div className="flex justify-between items-center mt-3">
                  <Button
                    variant="outline"
                    onClick={() => handleViewDetails(emp)}
                  >
                    View Details
                  </Button>
                  <p className="text-gray-500 text-sm mr-2">Pending Review</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/** Helper Component for displaying details inside modal */
function RequestDetails({ employee }: { employee: any }) {
  const [comment, setComment] = useState("");
  const [action, setAction] = useState<"approved" | "declined" | null>(null);

  const handleAction = (type: "approved" | "declined") => {
    setAction(type);
    console.log(`${type.toUpperCase()} with comment: ${comment}`);
    // TODO: Call API here to save the HR action
  };

  return (
    <div className="p-4 h-[1600px]">
      {/* === Basic Info === */}
      <Section title="Basic Information">
        <Info label="Email" value={employee.email} />
        <Info label="Phone" value={employee.phone} />
        <Info label="Date of Birth" value={employee.dob} />
        <Info label="Marital Status" value={employee.maritalStatus} />
      </Section>

      {/* === Address === */}
      <Section title="Address">
        <p className="text-gray-700">{employee.address}</p>
      </Section>

      {/* === Bank Details === */}
      <Section title="Bank Account Details">
        <Info label="Bank Name" value={employee.bankName} />
        <Info label="Account Number" value={employee.accountNumber} />
        <Info label="IFSC Code" value={employee.ifsc} />
      </Section>

      {/* === UAN/PF === */}
      <Section title="UAN / PF Details">
        <Info label="UAN Number" value={employee.uan} />
        <Info label="PF Account" value={employee.pfNumber} />
      </Section>

      {/* === Education === */}
      <Section title="Education">
        <Info label="Qualification" value={employee.qualification} />
        <Info label="University" value={employee.university} />
      </Section>

      {/* === Comment Section === */}
      <Section title="HR Comment">
        <Textarea
          placeholder="Add your comments or feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Section>

      {/* === Action Buttons === */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-50"
          onClick={() => handleAction("declined")}
        >
          <XCircle className="w-4 h-4" />
          Decline
        </Button>
        <Button
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          onClick={() => handleAction("approved")}
        >
          <CheckCircle className="w-4 h-4" />
          Approve
        </Button>
      </div>

      {action && (
        <div className="text-center text-sm mt-3">
          ✅ Request has been <b>{action}</b> successfully!
        </div>
      )}
    </div>
  );
}

/** Simple Info field for cleaner display */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm ">
      <span className="font-medium">{label}: </span>
      {value}
    </p>
  );
}

/** Section Wrapper for readability */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <Separator className="mb-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </section>
  );
}
