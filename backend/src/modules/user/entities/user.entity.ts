import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinTable,
  Index,
  BeforeUpdate,
  BeforeInsert
} from "typeorm";
import { IUser } from "../interfaces/user.interface";
import { DateTimeUtil } from "../../../utils/datetime.util";
import { Account } from "../../accounts/entities/account.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity("users")
@Index(["email", "deletedAt"], { unique: true }) // only 1 [email, deletedAt: null] existed
@Index(["phoneNumber", "deletedAt"], { unique: true }) // only 1 [phoneNumber, deletedAt: null] existed
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  firstName!: string;

  @Column({ type: "varchar", length: 255 })
  lastName!: string;

  @Index()
  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({
    type: "bigint",
    default: DateTimeUtil.toUnix("01-01-1970"),
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => Number(value)
    }
  }) // unix time
  birthDate!: number;

  @Index()
  @Column({ type: "varchar", length: 255, unique: true })
  phoneNumber!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;

  @OneToOne(() => Account, (account) => account.user)
  account!: Account;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user_roles" })
  roles!: Role[];

  @Column({
    type: "bigint",
    default: () => `${DateTimeUtil.toUnix(new Date())}`,
    transformer: {
      to: () => DateTimeUtil.toUnix(new Date()),
      from: (value: string | number) => Number(value)
    }
  })
  createdAt!: number;

  @Column({
    type: "bigint",
    default: () => `${DateTimeUtil.toUnix(new Date())}`,
    transformer: {
      to: () => DateTimeUtil.toUnix(new Date()),
      from: (value: string | number) => Number(value)
    }
  })
  updatedAt!: number;

  @BeforeInsert()
  setCreatedAt() {
    const now = DateTimeUtil.toUnix(new Date());
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = DateTimeUtil.toUnix(new Date());
  }

  // Soft-delete
  @Index()
  @Column({
    type: "bigint",
    nullable: true,
    transformer: {
      to: (value: number | null | undefined) => value ?? null,
      from: (value: string | number | null) =>
        value == null ? null : Number(value)
    }
  })
  deletedAt?: number | null;

  get isDeleted(): boolean {
    return this.deletedAt != null;
  }
}
