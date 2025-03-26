import { Injectable } from "@nestjs/common";
import { SignUpProps } from "src/views/signup-page";

@Injectable()
export class SignUpProvider {
  public async signUp(): Promise<SignUpProps> {
    return { pageTitle: "Sign 🎁 Up" };
  }
}
