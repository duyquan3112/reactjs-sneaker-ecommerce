import { IUser } from "../../user/interfaces/user.interface";

export interface IAccount {
  id: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  deletedAt?: number | null;
  isDeleted: boolean;
  user: IUser;
}
