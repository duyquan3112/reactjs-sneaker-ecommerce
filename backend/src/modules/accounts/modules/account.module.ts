import { PostgresDatasource } from "../../../config/postgres-database";
import { AccountController } from "../controllers/account.controller";
import { Account } from "../entities/account.entity";
import { AccountRepository } from "../repositories/account.repository";
import { AccountService } from "../services/account.service";

const accountRepository = new AccountRepository(
  PostgresDatasource.getRepository(Account)
);

const accountService = new AccountService(accountRepository);

const accountController = new AccountController(accountService);

export const accountModule = {
  accountRepository,
  accountService,
  accountController
};
