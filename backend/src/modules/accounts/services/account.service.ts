import { IAccountRepository } from "../interfaces/account-repository.interface";
import { IAccountService } from "../interfaces/account-service.interface";

export class AccountService implements IAccountService {
  private readonly accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository;
  }
}
