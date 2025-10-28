import { IAccountService } from "../interfaces/account-service.interface";

export class AccountController {
  private readonly accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this.accountService = accountService;
  }
}
