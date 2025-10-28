import { IRole } from "../../roles/interfaces/role.interface";
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: IRole[];
  birthDate: number; // unix time
  phoneNumber: string;
  address: string;
}
