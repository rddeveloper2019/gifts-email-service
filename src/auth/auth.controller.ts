import { SignInFormDataDto } from "./dtos/sign-in.formdata.dto";
import { AuthService } from "./auth.service";
import { Body, Controller, Post, Redirect, Res, Session } from "@nestjs/common";
import { Response } from "express";
import { FormDataRequest } from "nestjs-form-data";
import { SessionType } from "src/guards/session.guard";
import { SignUpFormDataDto } from "./dtos/sign-up.formdata.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up")
  @FormDataRequest()
  @Redirect("/")
  public async signUn(
    @Body() signUpFormDataDto: SignUpFormDataDto,
    @Session() session: SessionType,
  ): Promise<void> {
    return await this.authService.createUser(signUpFormDataDto, session);
  }

  @Post("/sign-in")
  @FormDataRequest()
  @Redirect("/")
  public async signIn(
    @Body() signInFormDataDto: SignInFormDataDto,
    @Session() session: SessionType,
  ): Promise<void> {
    return await this.authService.signIn(signInFormDataDto, session);
  }

  @Post("/logout")
  @Redirect("/")
  public async logOut(
    @Res() res: Response,
    @Session() session: SessionType,
  ): Promise<void> {
    session.destroy(() => {});
  }
}
