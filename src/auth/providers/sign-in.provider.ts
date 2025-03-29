import { Injectable } from "@nestjs/common";
import { SignInProps } from "src/views/prop-types";

@Injectable()
export class SignInProvider {
  public async signIn(): Promise<SignInProps> {
    return { pageTitle: "Sign 🎁 In" };
  }
}
