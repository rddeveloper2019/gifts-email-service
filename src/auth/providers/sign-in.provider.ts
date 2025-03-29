import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignInProps } from "src/views/prop-types";
import { Repository } from "typeorm";
import { SignInFormDataDto } from "../dtos/sign-in.formdata.dto";
import { User } from "../entities/user.entity";
import { BcryptProvider } from "./bcrypt.provider";

@Injectable()
export class SignInProvider {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly bcryptProvider: BcryptProvider,
  ) {}
  public async signIn(signInFormDataDto: SignInFormDataDto): Promise<User> {
    let user = await this.usersRepository.findOne({
      where: {
        email: signInFormDataDto.email,
      },
    });

    let isEqual: boolean = false;

    try {
      isEqual = await this.bcryptProvider.comparePassword(
        signInFormDataDto.password,
        user.password || "",
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "Could not compare passwords",
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException("Incorrect password");
    }

    return user;
  }
}
