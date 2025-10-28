import { LoginDTO } from "../dtos/request/login.dto";
import { RegisterDTO } from "../dtos/request/register.dto";
import { ITokenPair } from "./token-pair.interface";

export interface IAuthService {
  login(loginDTO: LoginDTO): Promise<ITokenPair>;
  register(registerDTO: RegisterDTO): Promise<boolean>;
}
