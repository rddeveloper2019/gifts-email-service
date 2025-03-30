import { Exclude } from "class-transformer";
import { Gift } from "src/gifts/entities/gift.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 96, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 96, nullable: false, unique: true })
  roomId: string;

  @Column({ type: "boolean", nullable: false, default: false })
  verified: string;

  @Column({ type: "varchar", length: 1024, nullable: true, unique: true })
  verificationCode: string;

  @Column({ type: "varchar", length: 96, nullable: true })
  @Exclude()
  password?: string;

  @Column({ type: "varchar", nullable: true })
  @Exclude()
  googleId?: string;

  @OneToMany(() => Gift, (gift) => gift.user)
  gifts: Promise<Gift[]>;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
