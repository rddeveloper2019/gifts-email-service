import { Injectable, UnauthorizedException } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import { SessionType } from "src/guards/session.guard";

@Injectable()
export class DecodeTokensProvider {
  constructor(private readonly jwtService: JwtService) {}

  public decodeToken(session: SessionType): object {
    try {
      const data = this.jwtService.decode(session.token);
      return data;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
