import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { DateTimeUtil } from "../../../utils/datetime.util";
import { IAccount } from "../interfaces/account.interface";

@Entity("accounts")
@Index(["email", "deletedAt"], { unique: true }) // only 1 [email, deletedAt: null] existed
export class Account implements IAccount {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255, select: false })
  password!: string;

  @Column({
    type: "bigint",
    default: () => `${DateTimeUtil.toUnix(new Date())}`,
    transformer: {
      to: () => DateTimeUtil.toUnix(new Date()),
      from: (value: string | number) => Number(value),
    },
  })
  createdAt!: number;

  @Column({
    type: "bigint",
    default: () => `${DateTimeUtil.toUnix(new Date())}`,
    transformer: {
      to: () => DateTimeUtil.toUnix(new Date()),
      from: (value: string | number) => Number(value),
    },
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

  @OneToOne(() => User, (user) => user.account, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Index()
  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Index()
  @Column({
    type: "bigint",
    nullable: true,
    transformer: {
      to: (value: number | null | undefined) => value ?? null,
      from: (value: string | number | null) =>
        value == null ? null : Number(value),
    },
  })
  deletedAt?: number | null;

  get isDeleted(): boolean {
    return this.deletedAt != null;
  }
}
