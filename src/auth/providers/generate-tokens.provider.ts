import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { User } from "../entities/user.entity";
import { ActiveUserData } from "../interfaces/active-user-data.interface";

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...(payload || {}),
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User): Promise<string> {
    return await this.signToken<Partial<ActiveUserData>>(
      user.id,
      this.jwtConfiguration.tokenTtl,
      {
        email: user.email,
      },
    );
  }
}
