import {
  Controller,
  Get,
  Param,
  Redirect,
  Render,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";
import { SessionGuard } from "./guards/session.guard";

@UseGuards(SessionGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect()
  @Render("mailings-page")
  public mailingsPage() {
    return {};
  }

  @Get("gifts")
  @Render("gifts-page")
  public giftsPage() {
    return {};
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
