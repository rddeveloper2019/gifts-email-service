import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GenerateTokensProvider } from "./generate-tokens.provider";
import { JwtService } from "@nestjs/jwt";

import { ConfigType } from "@nestjs/config";

import { timeStamp } from "console";
import jwtConfig from "../config/jwt.config";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
import { SessionType } from "src/guards/session.guard";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async refreshTokens(session: SessionType) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub">
      >(session.token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.usersRepository.findOneById(sub);

      session.token = await this.generateTokensProvider.generateTokens(user);
      session.roomId = user.roomId;
      session.save();
      console.log("(**)=>refreshTokens session: ", session);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
