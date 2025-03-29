import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Exclude() //@UseInterceptors(ClassSerializerInterceptor) in usr controller
  password?: string;

  @Column({ type: "varchar", nullable: true })
  @Exclude() //@UseInterceptors(ClassSerializerInterceptor) in usr controller
  googleId?: string;
}
