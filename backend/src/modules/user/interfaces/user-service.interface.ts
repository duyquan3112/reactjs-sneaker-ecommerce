import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";
import { IUser } from "./user.interface";

export interface IUserService {
  createUser(user: CreateUserDTO): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
  getUserById(id: string): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
  updateUser(id: string, user: UpdateUserDTO): Promise<IUser>;
  deleteUser(id: string): Promise<boolean>;
  checkExistByEmail(email: string): Promise<boolean>;
}
