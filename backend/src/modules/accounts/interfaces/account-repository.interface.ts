import { IBaseRepository } from "../../../interfaces/base-repository.interface";
import { IAccount } from "./account.interface";

export interface IAccountRepository extends IBaseRepository<IAccount> {
  findByEmail(email: string): Promise<IAccount | null>;
  checkExistByEmail(email: string): Promise<boolean>;
  checkExistByUserId(userId: string): Promise<boolean>;
}
