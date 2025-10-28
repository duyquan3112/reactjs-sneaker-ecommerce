import { Repository } from "typeorm";
import { IAccountRepository } from "../interfaces/account-repository.interface";
import { IAccount } from "../interfaces/account.interface";
import { Account } from "../entities/account.entity";

export class AccountRepository implements IAccountRepository {
  private readonly accountRepository: Repository<Account>;

  constructor(accountRepository: Repository<Account>) {
    this.accountRepository = accountRepository;
  }

  async findByEmail(email: string): Promise<IAccount | null> {
    return this.accountRepository.findOneBy({ email });
  }
  async checkExistByEmail(email: string): Promise<boolean> {
    return this.accountRepository.existsBy({ email });
  }
  async checkExistByUserId(userId: string): Promise<boolean> {
    return this.accountRepository.existsBy({ user: { id: userId } });
  }
  async create(data: Partial<IAccount>): Promise<IAccount> {
    return this.accountRepository.save(data);
  }
  async findById(id: string): Promise<IAccount | null> {
    return this.accountRepository.findOneBy({ id });
  }
  async findAll(): Promise<IAccount[]> {
    return this.accountRepository.find();
  }
  async update(id: string, data: Partial<IAccount>): Promise<IAccount | null> {
    await this.accountRepository.update(id, data);
    return this.accountRepository.findOneBy({ id });
  }
  async delete(id: string): Promise<boolean> {
    return this.accountRepository.delete(id).then(() => true);
  }
}
