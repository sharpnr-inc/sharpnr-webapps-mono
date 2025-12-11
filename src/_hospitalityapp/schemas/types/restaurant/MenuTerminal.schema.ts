export interface HospitalityOrg_MenuGroup {
  Id: string;
  Name: string;
  Type: string;
  Description: string;
}


export interface HospitalityOrg_GetAllMenuGroup_Response {
  data: HospitalityOrg_MenuGroup[];
}