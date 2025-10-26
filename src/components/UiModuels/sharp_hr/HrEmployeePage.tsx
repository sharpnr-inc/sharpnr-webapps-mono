import EmployeeAddEmployeeSection from "@/components/hr_module/EmployeeAddEmployeeSection";
import EmployeeAllEmployeeSection from "@/components/hr_module/EmployeeAllEmployeeSection";
import EmployeeOnBoardingSection from "@/components/hr_module/EmployeeOnBoardingSection";
import EmployeePrivilagesSection from "@/components/hr_module/EmployeePrivilagesSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function HrEmployeePage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="all-employees" className="w-full">
        <TabsList className="w-full h-auto flex-wrap justify-start">
          <TabsTrigger value="all_employees">All Employees</TabsTrigger>
          <TabsTrigger value="add_employee">Add Employee</TabsTrigger>
          <TabsTrigger value="on_boarding">On Baording</TabsTrigger>
          <TabsTrigger value="employee_privilages">
            Employee Privilages
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

        <TabsContent value="employee_privilages">
          <EmployeePrivilagesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
