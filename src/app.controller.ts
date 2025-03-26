import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { JsxRender } from "./jsx.decorator";
import MailnigsPage from "./views/mailnigs-page";
import GiftsPage from "./views/gifts-page";
import EditMailingPage from "./views/edit-mailing-page";
import { Response } from "express";
import EditGiftPage from "./views/edit-gift-page";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @JsxRender(MailnigsPage)
  public mailnigsPage() {
    return {};
  }

  @Get("/gifts")
  @JsxRender(GiftsPage)
  public giftsPage() {
    return {};
  }

  @Get("/edit-mailing/:id")
  @JsxRender(EditMailingPage)
  public editMailingPage(@Param("id") id: string) {
    return {};
  }

  @Get("/delete-mailing/:id")
  public deleteMailing(@Res() res: Response, @Param("id") id: string) {
    console.log("(**)=> dete id: ", id);
    res.redirect("/");
  }

  @Get("/edit-gift/:id")
  @JsxRender(EditGiftPage)
  public editGiftPage(@Param("id") id: string) {
    return {};
  }

  @Get("/delete-gift/:id")
  public deleteGift(@Res() res: Response, @Param("id") id: string) {
    console.log("(**)=> dete id: ", id);
    res.redirect("/gifts");
  }
}
