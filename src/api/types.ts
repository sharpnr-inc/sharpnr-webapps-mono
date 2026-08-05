/* ---------------------------------- <***> --------------------------------- */

export interface UserDataResponseDto {
  email: string;
  firstName: string;
  lastName: string;
  id: string; // uuid.UUID → string in TypeScript
  role: string;
}
