import { SignInFormDataDto } from "./dtos/sign-in.formdata.dto";
import { AuthService } from "./auth.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  Session,
} from "@nestjs/common";
import { SignInProps } from "src/views/signin-page";
import { Response, Request } from "express";
import { FormDataRequest } from "nestjs-form-data";
import { SignUpProps } from "src/views/prop-types";
import { SessionType } from "src/guards/session.guard";
import { SignUpFormDataDto } from "./dtos/sign-up.formdata.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("sign-in")
  @Render("signin-page")
  public async getSignInPage(): Promise<SignInProps> {
    return { pageTitle: "Sign In" };
  }

  @Post("/sign-up")
  @FormDataRequest()
  @Redirect("/")
  public async signUn(
    @Body() signUpFormDataDto: SignUpFormDataDto,
    @Session() session: SessionType,
  ): Promise<void> {
    return await this.authService.createUser(signUpFormDataDto, session);
  }

  @Get("sign-up")
  @Render("signup-page")
  public async getSignUpPage(): Promise<SignUpProps> {
    return { pageTitle: "Sign Up" };
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

  @Get("/logout")
  @Render("signin-page")
  public async logOut(@Res() res: Response): Promise<void> {
    return;
  }
}
