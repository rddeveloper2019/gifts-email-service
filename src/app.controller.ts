import {
  Controller,
  Get,
  Param,
  Redirect,
  Render,
  Res,
  UseGuards,
  Session,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";
import { SessionGuard, SessionType } from "./guards/session.guard";
import {
  GiftsPageProps,
  MailnigsPageProps,
  SignInProps,
  SignUpProps,
} from "./views/prop-types";
import { AuthService } from "./auth/auth.service";

@UseGuards(SessionGuard)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Redirect()
  @Render("mailings-page")
  public mailingsPage(@Session() session: SessionType): MailnigsPageProps {
    return { roomId: session.roomId };
  }

  @Get("gifts")
  @Render("gifts-page")
  public giftsPage(@Session() session: SessionType): GiftsPageProps {
    return { roomId: session.roomId };
  }

  @Get("sign-in")
  @Render("signin-page")
  public async getSignInPage(): Promise<SignInProps> {
    return { pageTitle: "Sign In" };
  }

  @Get("sign-up")
  @Render("signup-page")
  public async getSignUpPage(): Promise<SignUpProps> {
    return { pageTitle: "Sign Up" };
  }

  @Get("/edit-mailing/:id")
  @Render("edit-mailing-page")
  public editMailingPage(@Param("id") id: string) {
    return {};
  }

  @Get("/delete-mailing/:id")
  public deleteMailing(@Res() res: Response, @Param("id") id: string) {
    res.redirect("/");
  }

  @Get("/edit-gift/:id")
  @Render("edit-gift-page")
  public editGiftPage(@Param("id") id: string) {
    return {};
  }

  @Get("/delete-gift/:id")
  public deleteGift(@Res() res: Response, @Param("id") id: string) {
    res.redirect("/gifts");
  }
}
