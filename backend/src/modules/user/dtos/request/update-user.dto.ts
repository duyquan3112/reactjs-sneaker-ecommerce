import { IsDate, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { TransformToDate } from "../../../../common/decorators/transform.decorator";

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
  @TransformToDate()
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
