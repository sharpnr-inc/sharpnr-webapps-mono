import { useFormsModal } from "@/context/FormModalContext";
import { Button } from "../ui/button";
import AllEmployeeDataTable from "./data-tables/AllEmployeeDataTable";
import HrCreateEmployeeForm from "./forms/HrCreateEmployee";

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
    <div className="">
      <Button onClick={openForm}>Add Employee</Button>
      <AllEmployeeDataTable />
    </div>
  );
}
