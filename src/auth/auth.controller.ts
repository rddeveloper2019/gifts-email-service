import { SignUpFormDataDto } from "./dtos/sign-up.formdata.dto";
import { AuthService } from "./auth.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  Session,
} from "@nestjs/common";
import { SignInProps } from "src/views/signin-page";
import { Response } from "express";
import { FormDataRequest } from "nestjs-form-data";
import { SignUpProps } from "src/views/prop-types";
import { SessionType } from "src/guards/session.guard";

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
    return { pageTitle: "Sign Up" };
  }

  @Post("/sign-up")
  @FormDataRequest()
  @Redirect("/")
  public async createUser(
    @Body() signUpFormDataDto: SignUpFormDataDto,
    @Session() session: SessionType,
  ): Promise<void> {
    return await this.authService.createUser(signUpFormDataDto, session);
  }

  @Get("/logout")
  @Render("signin-page")
  public async logOut(@Res() res: Response): Promise<void> {
    return;
  }
}
