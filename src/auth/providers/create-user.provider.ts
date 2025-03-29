import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignUpFormDataDto } from "../dtos/sign-up.formdata.dto";
import { User } from "../entities/user.entity";
import { BcryptProvider } from "./bcrypt.provider";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly bcryptProvider: BcryptProvider,
  ) {}
  public async createUser(signUpFormDataDto: SignUpFormDataDto): Promise<User> {
    try {
      if (signUpFormDataDto.password !== signUpFormDataDto.passwordConfirm) {
        throw new Error("Passwords mismatch");
      }

      const userExists = await this.usersRepository.findOne({
        where: { email: signUpFormDataDto.email },
      });

      if (userExists) {
        throw new Error("User already exists");
      }

      const newUser = this.usersRepository.create({
        ...signUpFormDataDto,
        roomId: uuidv4(),
        password: await this.bcryptProvider.hashPassword(
          signUpFormDataDto.password,
        ),
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error?.message === "User already exists") {
        throw new BadRequestException("User already exists");
      }
      if (error?.message === "Passwords mismatch") {
        throw new BadRequestException("Passwords mismatch");
      }

      throw new RequestTimeoutException(
        "Unable to process your request at the moment, please try later",
        { description: String(error) },
      );
    }
  }
}
