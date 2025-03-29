import { Injectable } from "@nestjs/common";
import { SessionType } from "src/guards/session.guard";
import { CreateGiftFormDataDto } from "../dtos/create-gift.formdata.dto";
import { CreateGiftProvider } from "./create-gift.provider";

@Injectable()
export class GiftsService {
  constructor(private readonly createGiftProvider: CreateGiftProvider) {}

  public async createGift(
    greateGiftFormDataDto: CreateGiftFormDataDto,
    session: SessionType,
  ): Promise<void> {
    return this.createGiftProvider.createGift(greateGiftFormDataDto, session);
  }
}
