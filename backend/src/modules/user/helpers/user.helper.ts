import { DateTimeUtil } from "../../../utils/datetime.util";
import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";
import { User } from "../entities/user.entity";
import { IUser } from "../interfaces/user.interface";

export class UserHelper {
  static buildCreateUserFromDTO(dto: CreateUserDTO): Partial<IUser> {
    return {
      ...dto,
      birthDate: DateTimeUtil.toUnix(dto.birthDate),
    };
  }

  static buildUpdateUserFromDTO(
    dto: UpdateUserDTO,
    currentUser: User
  ): Partial<IUser> {
    return {
      ...dto,
      birthDate: dto.birthDate
        ? DateTimeUtil.toUnix(dto.birthDate)
        : currentUser.birthDate,
    };
  }
}
