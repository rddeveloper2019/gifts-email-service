import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import session, { Session } from "express-session";
import { AuthService } from "../auth/auth.service";
export type SessionType = Session &
  Partial<session.SessionData> & {
    token?: string;
    roomId?: string;
  };

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const session = request.session as SessionType;

    if (!session?.token) {
      throw new UnauthorizedException("Требуется аутентификация");
    }

    await this.authService.refreshTokens(session);

    return true;
  }
}
