import { IUserRepository } from "../interfaces/user-repository.interface";
import { IUser } from "../interfaces/user.interface";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

export class UsersRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    return this.userRepository.save(data);
  }

  async findById(id: string): Promise<IUser | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    return this.userRepository.delete(id).then(() => true);
  }

  async checkExistByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsBy({ email });
  }
}
