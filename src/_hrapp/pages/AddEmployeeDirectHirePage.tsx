import { Button } from "@/components/ui/button";
import HRRecruitmentAddEmployeePage from "./HRRecruitmentPage";

export function AddEmployeeDirectHirePage() {
  return (
    <div className="p-2 border h-full m-2">
      <Button>Back to Employee</Button>
      <div>
        <HRRecruitmentAddEmployeePage />
      </div>
    </div>
  );
}
