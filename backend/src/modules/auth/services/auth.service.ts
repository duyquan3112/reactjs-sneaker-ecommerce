import {
  ErrorCode,
  HttpStatusCode
} from "../../../constants/http-status-code.constant";
import { AppError } from "../../../utils/app-error.util";
import { IUserRepository } from "../../user/interfaces/user-repository.interface";
import { IUserService } from "../../user/interfaces/user-service.interface";
import { LoginDTO } from "../dtos/request/login.dto";
import { AuthResponseDTO } from "../dtos/response/auth-response.dto";
import AuthHelper from "../helpers/auth.helper";
import { IJwtPayload, IJwtService } from "../interfaces/jwt-payload.interface";
import { IAccountRepository } from "../../accounts/interfaces/account-repository.interface";
import { ITokenPair } from "../interfaces/token-pair.interface";
import { AppLogger } from "../../../utils/app-logger.util";
import { IAuthService } from "../interfaces/auth-service.interface";
import { RegisterDTO } from "../dtos/request/register.dto";
import { CreateUserDTO } from "../../user/dtos/request/create-user.dto";
import { plainToInstance } from "class-transformer";
import { PostgresDatasource } from "../../../config/postgres-database";
import { User } from "../../user/entities/user.entity";
import { Account } from "../../accounts/entities/account.entity";
import { IAccount } from "../../accounts/interfaces/account.interface";
import { UserHelper } from "../../user/helpers/user.helper";

export class AuthService implements IAuthService {
  constructor(accountRepository: IAccountRepository, jwtService: IJwtService) {
    this.accountRepository = accountRepository;
    this.jwtService = jwtService;
  }
  private readonly accountRepository: IAccountRepository;
  private readonly jwtService: IJwtService;

  async login(loginDTO: LoginDTO): Promise<ITokenPair> {
    // use dummy password to prevent timing attack
    const DUMMY_PASSWORD = "DUMMY_PASSWORD";

    const { email, password } = loginDTO;

    const isAccountExist =
      await this.accountRepository.checkExistByEmail(email);

    const queryBuilder =
      PostgresDatasource.getRepository(Account).createQueryBuilder("accounts");

    const account = isAccountExist
      ? await queryBuilder
          .addSelect("accounts.password")
          .leftJoinAndSelect("accounts.user", "users")
          .where("accounts.email = :email", { email })
          .getOne()
      : null;

    const passwordHash = isAccountExist
      ? account!.password
      : await AuthHelper.hashPassword(DUMMY_PASSWORD);

    const isPasswordMatched = await AuthHelper.comparePassword(
      password,
      passwordHash
    );

    if (!isPasswordMatched) {
      throw new AppError(
        HttpStatusCode.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
        "Invalid email or password!"
      );
    }

    const payload: IJwtPayload = {
      sub: account!.user.id,
      email: account!.email
    };

    const accessToken = this.jwtService.genAccessToken(payload);
    const refreshToken = this.jwtService.genRefreshToken(payload);

    const tokenPair: ITokenPair = {
      accessToken: accessToken,
      refreshToken: refreshToken
    };

    AppLogger.info(`Login successful for user ${account!.user.id}`);
    AppLogger.debug(`Token pair: ${JSON.stringify(tokenPair)}`);

    return tokenPair;
  }

  async register(registerDTO: RegisterDTO): Promise<boolean> {
    const { password, userData } = registerDTO;

    const result = await PostgresDatasource.transaction(async (manager) => {
      const accountRepository = manager.getRepository(Account);
      const userRepository = manager.getRepository(User);

      // create user first, then if success, create account
      const createUserData = UserHelper.buildCreateUserFromDTO(userData);
      const user: User = userRepository.create(createUserData);

      await userRepository.save(user);

      // create account, if failed, rollback create user step before
      const accountData: Partial<IAccount> = {
        email: userData.email,
        password: await AuthHelper.hashPassword(password)
      };

      const account: Account = accountRepository.create(accountData);

      account.user = user;

      await accountRepository.save(account);
    })
      .then(() => true)
      .catch((err: Error) => {
        throw new AppError(
          HttpStatusCode.BAD_REQUEST,
          ErrorCode.BAD_REQUEST,
          err.message
        );
      });

    return result;
  }
}
