import { ToastTypes } from "./../toasts/enum/toasts.enum";
import { CreateUserProvider } from "./providers/create-user.provider";
import { SignInProvider } from "./providers/sign-in.provider";
import { Injectable } from "@nestjs/common";
import { ToastsService } from "../toasts/toasts.service";
import { SignInFormDataDto } from "./dtos/sign-in.formdata.dto";
import { SessionType } from "src/guards/session.guard";
import { GenerateTokensProvider } from "./providers/generate-tokens.provider";
import { RefreshTokensProvider } from "./providers/refresh-tokens.provider";
import { SignUpFormDataDto } from "./dtos/sign-up.formdata.dto";
//todo remove
const users = ["1", "2", "3"];
const types: ToastTypes[] = [
  ToastTypes.WARNING,
  ToastTypes.SUCCESS,
  ToastTypes.DANGER,
];
const getRandom = <T>(arr: T[] = []) =>
  arr[Math.floor(Math.random() * arr.length)];

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly toastsService: ToastsService,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {
    setInterval(() => {
      const userId = getRandom(users);
      const type = getRandom(types);
      const body = `Your id is: ${"c455f308-ac7f-431c-8084-c7d311e15889"}. Message: ${Date.now().toString()}`;
      this.toastsService.sendMessage(
        "c455f308-ac7f-431c-8084-c7d311e15889",
        type,
        body,
      );
    }, 5000);
  }

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
}
