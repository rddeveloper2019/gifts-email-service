import { Injectable } from "@nestjs/common";
import { SignInProps } from "src/views/signin-page";

@Injectable()
export class SignInProvider {
  public async signIn(): Promise<SignInProps> {
    return { pageTitle: "Sign 🎁 In" };
  }
}
