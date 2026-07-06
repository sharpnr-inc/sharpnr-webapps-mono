export interface EmployeeRole {
  id: string;
  role: string;
  description: string;
}

export interface EmployeeOfOrganization {
  id: string;
  name: string;
  nickname: string;
  role: EmployeeRole;
  status: string;
}
