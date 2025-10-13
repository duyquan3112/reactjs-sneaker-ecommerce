import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  lastName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  email?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value.trim())
  birthDate?: Date;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  address?: string;
}
