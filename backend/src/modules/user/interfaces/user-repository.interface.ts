import { IBaseRepository } from "../../../interfaces/base-repository.interface";
import { IUser } from "./user.interface";

export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  checkExistByEmail(email: string): Promise<boolean>;
}
