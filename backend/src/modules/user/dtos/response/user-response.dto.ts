import { Expose, Transform } from "class-transformer";

export class UserResponseDTO {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  roles: string[];

  @Expose()
  birthDate: number; // unix time

  @Expose()
  phoneNumber: string;

  @Expose()
  address: string;
}
