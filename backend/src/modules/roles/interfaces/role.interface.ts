import { IUser } from "../../user/interfaces/user.interface";

export interface IRole {
  id: number;
  name: string;
  users: IUser[];
}
