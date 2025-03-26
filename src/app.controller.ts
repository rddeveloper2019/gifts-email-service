import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { JsxRender } from "./jsx.decorator";
import Homepage, { PageProps } from "./views/homepage";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @JsxRender(Homepage)
  homepage(): PageProps {
    return {
      items: this.appService.getHello(),
    };
  }
}
