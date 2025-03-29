import { ToastTypes } from "./../toasts/enum/toasts.enum";
import { CreateUserProvider } from "./providers/create-user.provider";
import { SignInProvider } from "./providers/sign-in.provider";
import { Injectable } from "@nestjs/common";
import { ToastsService } from "../toasts/toasts.service";
import { SignInProps, SignUpProps } from "../views/prop-types";
import { SignUpFormDataDto } from "./dtos/sign-up.formdata.dto";
import { SessionType } from "src/guards/session.guard";
import { GenerateTokensProvider } from "./providers/generate-tokens.provider";
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
  ) {
    setInterval(() => {
      const userId = getRandom(users);
      const type = getRandom(types);
      const body = `Your id is: ${userId}. Message: ${Date.now().toString()}`;
      this.toastsService.sendMessage(userId, type, body);
    }, 5000);
  }

  public async signIn(): Promise<SignInProps> {
    return await this.signInProvider.signIn();
  }

  public async createUser(
    signUpFormDataDto: SignUpFormDataDto,
    session: SessionType,
  ): Promise<void> {
    const user = await this.createUserProvider.createUser(signUpFormDataDto);
    session.token = await this.generateTokensProvider.generateTokens(user);
  }
}
