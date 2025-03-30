import { CreateUserProvider } from "./providers/create-user.provider";
import { SignInProvider } from "./providers/sign-in.provider";
import { Injectable } from "@nestjs/common";
import { SignInFormDataDto } from "./dtos/sign-in.formdata.dto";
import { SessionType } from "src/guards/session.guard";
import { GenerateTokensProvider } from "./providers/generate-tokens.provider";
import { RefreshTokensProvider } from "./providers/refresh-tokens.provider";
import { SignUpFormDataDto } from "./dtos/sign-up.formdata.dto";
import { DecodeTokensProvider } from "./providers/decode-token.provider";

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
    private readonly decodeTokensProvider: DecodeTokensProvider,
  ) {}

  public async signIn(
    signInFormDataDto: SignInFormDataDto,
    session: SessionType,
  ): Promise<void> {
    const user = await this.signInProvider.signIn(signInFormDataDto);
    session.token = await this.generateTokensProvider.generateTokens(user);
    session.roomId = user.roomId;
    session.save();
  }

  public async createUser(
    signUpFormDataDto: SignUpFormDataDto,
    session: SessionType,
  ): Promise<void> {
    const user = await this.createUserProvider.createUser(signUpFormDataDto);
    session.token = await this.generateTokensProvider.generateTokens(user);
    session.roomId = user.roomId;
    session.save();
  }
  public async refreshTokens(session: SessionType): Promise<void> {
    await this.refreshTokensProvider.refreshTokens(session);
  }
  public decodeToken(session: SessionType): object {
    return this.decodeTokensProvider.decodeToken(session);
  }
}
