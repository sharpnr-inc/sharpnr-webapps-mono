import EmployeeAllEmployeeSection from "@/components/hr_module/EmployeeAllEmployeeSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function HrEmployeePage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="all-employees" className="w-full">
        <TabsList className="w-full h-auto flex-wrap justify-start">
          <TabsTrigger value="all_employees">All Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="add_employee">Add Employee</TabsTrigger>
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

        <TabsContent value="add_employee">
          {/* Pending & approved leave requests */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
