import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { TransformToDate } from "../../../../common/decorators/transform.decorator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsDate()
  @IsNotEmpty()
  @TransformToDate()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  address: string;
}
