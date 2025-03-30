import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Session,
} from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { SessionType } from "src/guards/session.guard";
import { CreateGiftFormDataDto } from "./dtos/create-gift.formdata.dto";
import { GiftsService } from "./providers/gifts.service";

@Controller("gifts")
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post("/gift-form")
  @FormDataRequest()
  @Redirect("/gifts")
  public async createGift(
    @Body() greateGiftFormDataDto: CreateGiftFormDataDto,
    @Session() session: SessionType,
  ): Promise<void> {
    return await this.giftsService.createGift(greateGiftFormDataDto, session);
  }

  @Delete("/:id")
  @Redirect("/gifts")
  public async deleteGift(
    @Param("id", ParseIntPipe) id: number,
    @Session() session: SessionType,
  ): Promise<void> {
    return await this.giftsService.deleteGift(id, session);
  }
}
