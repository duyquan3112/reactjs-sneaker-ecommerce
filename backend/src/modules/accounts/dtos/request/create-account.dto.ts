import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAccountDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}
