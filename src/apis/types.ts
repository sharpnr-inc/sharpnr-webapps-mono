/* ---------------------------------- <***> --------------------------------- */

export type UserDataResponseDto = {
  email: string;
  firstName: string;
  lastName: string;
  id: string; // UUID
  role: string;
  org_data: OrgData;
};

export type OrgData = {
  org_name: string;
  sharp_id: string;
};
