import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";
import { IUser } from "./user.interface";

export interface IUserService {
  createUser(user: CreateUserDTO): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
  getUsers(): Promise<IUser[]>;
  updateUser(id: string, user: UpdateUserDTO): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
}
