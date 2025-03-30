import { Transform } from "class-transformer";
import { User } from "src/auth/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Gift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 512,
    nullable: true,
  })
  logo?: string;

  @Column({ type: "varchar", length: 96, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 1024, nullable: false, unique: true })
  name: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User, (user) => user.gifts)
  user: Promise<User>;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
