import EmployementHistorySection from "@/components/employee_module/profile/EmployementHistorySection";
import ImportantDatesSection from "@/components/employee_module/profile/ImportantDatesSection";
import OverviewSection from "@/components/employee_module/profile/OverviewSection";
import PersonalDetailsSection from "@/components/employee_module/profile/PersonalDetailsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmployeeProfilePage() {
  return (
    <div className="p-2">
      {/* This is the Tab section and will export the all the tabs   */}
      <Tabs>
        <TabsList className="w-max p-1 space-x-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal_details">Personal Details</TabsTrigger>
          <TabsTrigger value="employement_history">
            Employement History
          </TabsTrigger>
          <TabsTrigger value="important_dates">Important Dates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewSection />
        </TabsContent>

        <TabsContent value="personal_details">
          <PersonalDetailsSection />
        </TabsContent>

        <TabsContent value="employement_history">
          <EmployementHistorySection />
        </TabsContent>

        <TabsContent value="important_dates">
          <ImportantDatesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
