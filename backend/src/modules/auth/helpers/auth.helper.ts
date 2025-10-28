import bcrypt from "bcrypt";

export default class AuthHelper {
  static readonly #SALT_ROUNDS: number = 10;

  static async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, this.#SALT_ROUNDS);
  }
}
