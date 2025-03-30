import {
  Controller,
  Get,
  Param,
  Redirect,
  Render,
  UseGuards,
  Session,
  ParseIntPipe,
} from "@nestjs/common";
import { SessionGuard, SessionType } from "./guards/session.guard";
import { GiftsPageProps, SignInProps, SignUpProps } from "./views/prop-types";
import { GiftsService } from "./gifts/providers/gifts.service";

@UseGuards(SessionGuard)
@Controller()
export class AppController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  @Redirect("gifts")
  @Render("gifts-page")
  public async redirectToGiftsPage(
    @Session() session: SessionType,
  ): Promise<GiftsPageProps> {
    return this.giftsPage(session);
  }

  @Get("gifts")
  @Render("gifts-page")
  public async giftsPage(
    @Session() session: SessionType,
  ): Promise<GiftsPageProps> {
    const gifts = await this.giftsService.findAll(session);
    return { roomId: session.roomId, gifts };
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

  @Get("/edit-gift/:id")
  @Render("edit-gift-page")
  public async editGiftPage(
    @Param("id", ParseIntPipe) id: number,
    @Session() session: SessionType,
  ) {
    return { gift: await this.giftsService.findOne(id, session) };
  }
}
