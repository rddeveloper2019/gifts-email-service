import { ToastTypes } from "./../toasts/enum/toasts.enum";
import { SignUpProvider } from "./providers/sign-up.provider";
import { SignInProvider } from "./providers/sign-in.provider";
import { Injectable } from "@nestjs/common";
import { SignInProps } from "src/views/signin-page";
import { SignUpProps } from "src/views/signup-page";
import { ToastsService } from "src/toasts/toasts.service";

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
    private readonly signUpProvider: SignUpProvider,
    private readonly toastsService: ToastsService,
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
  public async signUp(): Promise<SignUpProps> {
    return await this.signUpProvider.signUp();
  }
}
