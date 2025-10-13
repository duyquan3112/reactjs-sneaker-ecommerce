export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  birthDate: number; // unix time
  phoneNumber: string;
  address: string;
}
