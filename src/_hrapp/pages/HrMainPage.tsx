import EmployeeAddEmployeeSection from "@/_hrapp/sections/employee/EmployeeAddEmployeeSection";
import EmployeeAllEmployeeSection from "@/_hrapp/sections/employee/EmployeeAllEmployeeSection";
import EmployeeOnBoardingSection from "@/_hrapp/sections/employee/EmployeeOnBoardingSection";
import EmployeePrivilagesSection from "@/_hrapp/sections/employee/EmployeePrivilagesSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function HrEmployeePage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="all_employees" className="w-full">
        <TabsList className="w-full h-auto flex-wrap justify-start">
          <TabsTrigger value="all_employees">All Employees</TabsTrigger>
          <TabsTrigger value="add_employee">Add Employee</TabsTrigger>
          <TabsTrigger value="on_boarding">On Boarding</TabsTrigger>
          <TabsTrigger value="employee_privileges">
            Employee Privileges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all_employees" className="border">
          <EmployeeAllEmployeeSection />
        </TabsContent>

        <TabsContent value="add_employee">
          <EmployeeAddEmployeeSection />
        </TabsContent>

        <TabsContent value="on_boarding">
          <EmployeeOnBoardingSection />
        </TabsContent>

        <TabsContent value="employee_privileges">
          <EmployeePrivilagesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
