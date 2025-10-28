import { Expose, Type } from "class-transformer";
import { IsObject } from "class-validator";

export class TokenPairResponseDTO {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
