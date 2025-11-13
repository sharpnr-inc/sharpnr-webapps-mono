import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AGGridEmployeeDemo from "./data-tables/AGgridDemo";

export default function EmployeeAllEmployeeSection() {
  return (
    <div className="p-2 space-y-2">
      <div className="grid grig-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
      </div>
      <AGGridEmployeeDemo />
      {/* <AllEmployeeDataTable/> */}
    </div>
  );
}
