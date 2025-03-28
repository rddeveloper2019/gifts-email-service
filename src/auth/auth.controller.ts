import { SignUpProps } from "../views/signup-page";
import { AuthService } from "./auth.service";
import { Controller, Get, Render, Res } from "@nestjs/common";
import { SignInProps } from "src/views/signin-page";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("sign-in")
  @Render("signin-page")
  public async signIn(): Promise<SignInProps> {
    return await this.authService.signIn();
  }

  @Get("sign-up")
  @Render("signup-page")
  public async signUp(): Promise<SignUpProps> {
    return await this.authService.signUp();
  }

  @Get("/logout")
  @Render("signin-page")
  public async logOut(@Res() res: Response): Promise<void> {
    return;
  }
}
