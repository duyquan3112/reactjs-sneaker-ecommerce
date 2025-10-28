import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";
import { TransformToDate } from "../../../../common/decorators/transform.decorator";
import { Transform, Type } from "class-transformer";
import { CreateUserDTO } from "../../../user/dtos/request/create-user.dto";

export class RegisterDTO {
  @IsObject()
  @IsNotEmpty()
  @Type(() => CreateUserDTO)
  userData: CreateUserDTO;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Transform(({ value }) => value.trim())
  password: string;
}
