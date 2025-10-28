import config from "../../../config/config";
import { IJwtPayload, IJwtService } from "../interfaces/jwt-payload.interface";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export class JwtService implements IJwtService {
  genAccessToken(payload: IJwtPayload): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExp,
      jwtid: uuidv4(),
      algorithm: "HS256",
    });
  }
  genRefreshToken(payload: IJwtPayload): string {
    return jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExp,
      jwtid: uuidv4(),
      algorithm: "HS256",
    });
  }
  verifyAccessToken(token: string): IJwtPayload {
    const jwtDecoded = jwt.verify(token, config.jwtSecret, {
      algorithms: ["HS256"],
    });
    return jwtDecoded as IJwtPayload;
  }
  verifyRefreshToken(token: string): IJwtPayload {
    const jwtDecoded = jwt.verify(token, config.jwtRefreshSecret, {
      algorithms: ["HS256"],
    });
    return jwtDecoded as IJwtPayload;
  }
}
