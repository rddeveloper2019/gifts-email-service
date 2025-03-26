import SignUpPage, { SignUpProps } from "./../views/signup-page";
import { AuthService } from "./auth.service";
import { Controller, Get, Res } from "@nestjs/common";
import SignInPage, { SignInProps } from "src/views/signin-page";
import { JsxRender } from "src/jsx.decorator";
import { Response } from "express";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("sign-in")
  @JsxRender(SignInPage)
  public async signIn(): Promise<SignInProps> {
    return await this.authService.signIn();
  }

  @Get("sign-up")
  @JsxRender(SignUpPage)
  public async signUp(): Promise<SignUpProps> {
    return await this.authService.signUp();
  }

  @Get("/logout")
  @JsxRender(SignUpPage)
  public async logOut(@Res() res: Response): Promise<void> {
    res.redirect("/auth/sign-in");
  }
}
