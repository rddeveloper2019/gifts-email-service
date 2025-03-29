// src/auth/session.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import session, { Session } from "express-session";
import { RefreshTokensProvider } from "../auth/providers/refresh-tokens.provider";
export type SessionType = Session &
  Partial<session.SessionData> & {
    token?: string;
  };

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly refreshTokensProvider: RefreshTokensProvider) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const session = request.session as SessionType;

    if (!session?.token) {
      throw new UnauthorizedException("Требуется аутентификация");
    }

    await this.refreshTokensProvider.refreshTokens(session);

    return true;
  }
}
