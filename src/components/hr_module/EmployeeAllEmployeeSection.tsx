import { useFormsModal } from "@/context/FormModalContext";
import { Button } from "../ui/button";
import HrCreateEmployeeForm from "./forms/HrCreateEmployee";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import AGGridDemo from "./data-tables/AGgridDemo";
import AGGridEmployeeDemo from "./data-tables/AGgridDemo";

export default function EmployeeAllEmployeeSection() {
  const { showModal } = useFormsModal();

  const openForm = () => {
    showModal(
      "User Form",
      "Fill out your details below",
      <HrCreateEmployeeForm />
    );
  };

  return (
    <div className="p-2 space-y-2">
      <Button onClick={openForm}>Add Employee</Button>
      <div className="grid grig-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>all the List of employee in the organisation</CardDescription>
            <CardContent>
              56
            </CardContent>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>all the List of employee in the organisation</CardDescription>
            <CardContent>
              56
            </CardContent>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>all the List of employee in the organisation</CardDescription>
            <CardContent>
              56
            </CardContent>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>all the List of employee in the organisation</CardDescription>
            <CardContent>
              56
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      <AGGridEmployeeDemo />
      {/* <AllEmployeeDataTable/> */}
    </div>
  );
}
