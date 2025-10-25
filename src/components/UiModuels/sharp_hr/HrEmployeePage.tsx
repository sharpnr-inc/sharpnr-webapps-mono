import EmployeeAllEmployeeSection from "@/components/hr_module/EmployeeAllEmployeeSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function HrEmployeePage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="all-employees" className="w-full">
        <TabsList className="w-full h-auto flex-wrap justify-start">
          <TabsTrigger value="all-employees">All Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave-requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="all-employees" className="border">
          <EmployeeAllEmployeeSection/>
        </TabsContent>

        <TabsContent value="departments">
          {/* Department-wise employee listing */}
        </TabsContent>

        <TabsContent value="attendance">
          {/* Attendance calendar or summary */}
        </TabsContent>

        <TabsContent value="leave-requests">
          {/* Pending & approved leave requests */}
        </TabsContent>

        <TabsContent value="payroll">
          {/* Payroll and payslip management */}
        </TabsContent>

        <TabsContent value="performance">
          {/* KPI and performance reviews */}
        </TabsContent>

        <TabsContent value="new-hire">{/* Add employee form */}</TabsContent>

        <TabsContent value="resigned">
          {/* Inactive/Resigned employees list */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
