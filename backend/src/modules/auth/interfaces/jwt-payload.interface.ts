export interface IJwtPayload {
  sub: string; // user id
  email: string;
}

export interface IJwtService {
  genAccessToken(payload: IJwtPayload): string;
  genRefreshToken(payload: IJwtPayload): string;
  verifyAccessToken(token: string): IJwtPayload;
  verifyRefreshToken(token: string): IJwtPayload;
}
