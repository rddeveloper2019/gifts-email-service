import { SignUpProvider } from "./providers/sign-up.provider";
import { SignInProvider } from "./providers/sign-in.provider";
import { Injectable } from "@nestjs/common";
import { SignInProps } from "src/views/signin-page";
import { SignUpProps } from "src/views/signup-page";
import { ToastsService } from "src/toasts.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly signUpProvider: SignUpProvider,
    // private readonly toastsService: ToastsService,
  ) {
    // setInterval(() => {
    //   this.toastsService.sendMessage(Date.now().toString());
    // }, 1000);
  }

  public async signIn(): Promise<SignInProps> {
    return await this.signInProvider.signIn();
  }
  public async signUp(): Promise<SignUpProps> {
    return await this.signUpProvider.signUp();
  }
}
