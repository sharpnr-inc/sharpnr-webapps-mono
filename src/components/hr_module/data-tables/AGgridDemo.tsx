import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

// Register AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);
export const myTheme = themeQuartz.withParams({
  backgroundColor: "#1f2836",
  browserColorScheme: "dark",
  foregroundColor: "#ffffff",
  borderColor: "#3a3a3a", // border color
  rowBorder: true, // ✅ adds horizontal row borders
  columnBorder: true,
  headerColumnBorder: true,     // ✅ ensures vertical lines in header
});

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: "Active" | "Inactive" | "On Leave";
  salary: number;
  performance: "Excellent" | "Good" | "Average" | "Below Average";
  image: string;
}

// Employee Avatar Component
const EmployeeAvatar = (props: any) => {
  const { data } = props;

  return (
    <div className="flex items-center gap-3">
      <img
        src={data.image}
        alt={data.name}
        className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
      />
      <span className="font-medium">{data.name}</span>
    </div>
  );
};

// Status Badge Component
const StatusBadge = (props: any) => {
  const { value } = props;

  const statusConfig = {
    Active: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
      dot: "bg-green-500",
    },
    "On Leave": {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
      dot: "bg-yellow-500",
    },
    Inactive: {
      bg: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-300",
      dot: "bg-gray-400",
    },
  };

  const config = statusConfig[value as keyof typeof statusConfig];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {value}
    </span>
  );
};

// Performance Badge Component
const PerformanceBadge = (props: any) => {
  const { value } = props;

  const perfConfig = {
    Excellent: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
    },
    Good: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
    },
    Average: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
    },
    "Below Average": {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-300",
    },
  };

  const config = perfConfig[value as keyof typeof perfConfig];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {value}
    </span>
  );
};

const AGGridEmployeeDemo = () => {
  const [rowData] = useState<Employee[]>([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "+91 9876543210",
      department: "Engineering",
      designation: "Frontend Developer",
      joiningDate: "2022-03-14",
      status: "Active",
      salary: 75000,
      performance: "Excellent",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha.verma@example.com",
      phone: "+91 9876500011",
      department: "Human Resources",
      designation: "HR Manager",
      joiningDate: "2020-08-22",
      status: "Active",
      salary: 68000,
      performance: "Good",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Rohan Patel",
      email: "rohan.patel@example.com",
      phone: "+91 9822334455",
      department: "Finance",
      designation: "Accountant",
      joiningDate: "2021-11-05",
      status: "Active",
      salary: 59000,
      performance: "Average",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 4,
      name: "Simran Kaur",
      email: "simran.kaur@example.com",
      phone: "+91 9988776655",
      department: "Marketing",
      designation: "Marketing Executive",
      joiningDate: "2023-01-15",
      status: "On Leave",
      salary: 52000,
      performance: "Good",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 9811122233",
      department: "Engineering",
      designation: "Backend Developer",
      joiningDate: "2021-06-01",
      status: "Active",
      salary: 82000,
      performance: "Excellent",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      id: 6,
      name: "Pooja Mehta",
      email: "pooja.mehta@example.com",
      phone: "+91 9900112233",
      department: "Customer Support",
      designation: "Support Executive",
      joiningDate: "2022-09-10",
      status: "Inactive",
      salary: 41000,
      performance: "Below Average",
      image: "https://randomuser.me/api/portraits/women/36.jpg",
    },
    {
      id: 7,
      name: "Karan Desai",
      email: "karan.desai@example.com",
      phone: "+91 9819988877",
      department: "Sales",
      designation: "Sales Associate",
      joiningDate: "2023-02-28",
      status: "Active",
      salary: 47000,
      performance: "Good",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 8,
      name: "Ananya Nair",
      email: "ananya.nair@example.com",
      phone: "+91 9797552211",
      department: "Engineering",
      designation: "UI/UX Designer",
      joiningDate: "2021-04-10",
      status: "Active",
      salary: 72000,
      performance: "Excellent",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
    },
  ]);

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 80,
        pinned: "left",
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        field: "name",
        headerName: "Employee",
        width: 220,
        pinned: "left",
        cellRenderer: EmployeeAvatar,
        filter: "agTextColumnFilter",
      },
      {
        field: "email",
        headerName: "Email",
        width: 220,
        filter: "agTextColumnFilter",
        editable: true,
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 150,
        editable: true,
      },
      {
        field: "department",
        headerName: "Department",
        width: 150,
        filter: "agSetColumnFilter",
        editable: true,
      },
      {
        field: "designation",
        headerName: "Designation",
        width: 180,
        filter: "agTextColumnFilter",
        editable: true,
      },
      {
        field: "joiningDate",
        headerName: "Joining Date",
        width: 130,
        filter: "agDateColumnFilter",
        editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        cellRenderer: StatusBadge,
        filter: "agSetColumnFilter",
      },
      {
        field: "salary",
        headerName: "Salary",
        width: 130,
        filter: "agNumberColumnFilter",
        editable: true,
        valueFormatter: (params) => {
          if (params.value == null) return "";
          return "₹" + params.value.toLocaleString();
        },
        cellStyle: { textAlign: "right", fontWeight: "600" },
      },
      {
        field: "performance",
        headerName: "Performance",
        width: 150,
        cellRenderer: PerformanceBadge,
        filter: "agSetColumnFilter",
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
    }),
    []
  );

  // Calculate stats
  const stats = useMemo(() => {
    const activeCount = rowData.filter((e) => e.status === "Active").length;
    const onLeaveCount = rowData.filter((e) => e.status === "On Leave").length;
    const avgSalary = Math.round(
      rowData.reduce((sum, e) => sum + e.salary, 0) / rowData.length
    );
    const excellentPerf = rowData.filter(
      (e) => e.performance === "Excellent"
    ).length;

    return { activeCount, onLeaveCount, avgSalary, excellentPerf };
  }, [rowData]);

  return (
    <div className="p-4">
      <div className="ag-theme-quartz border rounded-lg overflow-y-auto h-[800px]">
        <AgGridReact<Employee>
          theme={myTheme} // ← Add this
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          animateRows={true}
          pagination={true}
          paginationPageSize={5}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          
        />
      </div>
    </div>
  );
};

export default AGGridEmployeeDemo;
