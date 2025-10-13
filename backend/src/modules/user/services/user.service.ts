import { IUserRepository } from "../interfaces/user-repository.interface";
import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { UserRole, IUser } from "../interfaces/user.interface";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";
import { IUserService } from "../interfaces/user-service.interface";
import { DateTimeUtil } from "../../../utils/datetime.util";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: CreateUserDTO) {
    const createUserData = this.buildCreateUserFromDTO(user);
    return this.userRepository.create(createUserData);
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async getUsers() {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, user: UpdateUserDTO) {
    const updateUserData = this.buildUpdateUserFromDTO(user);
    return this.userRepository.update(id, updateUserData);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }

  private buildCreateUserFromDTO(user: CreateUserDTO): Partial<IUser> {
    return {
      ...user,
      role: UserRole.USER, // Default role is USER
      birthDate: DateTimeUtil.toUnix(user.birthDate)
    };
  }

  private buildUpdateUserFromDTO(user: UpdateUserDTO): Partial<IUser> {
    return {
      ...user,
      birthDate: user.birthDate
        ? DateTimeUtil.toUnix(user.birthDate)
        : undefined
    };
  }
}
