export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string; // could also be Date if you plan to parse it
  status: "Active" | "Inactive" | "On Leave";
  salary: number;
  performance: "Excellent" | "Good" | "Average" | "Below Average";
  image: string;
}

export interface EmployeeData {
  employees: Employee[];
}

export const employee_data: EmployeeData = {
  employees: [
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
  ],
};
