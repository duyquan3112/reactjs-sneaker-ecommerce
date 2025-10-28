import { Expose, Type } from "class-transformer";
import { UserResponseDTO } from "../../../user/dtos/response/user-response.dto";
import { TokenPairResponseDTO } from "./token-pair-response.dto";

export class AuthResponseDTO {
  @Expose()
  @Type(() => TokenPairResponseDTO)
  tokens: TokenPairResponseDTO;

  @Expose()
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;
}
