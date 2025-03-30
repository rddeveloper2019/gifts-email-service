import { Injectable } from "@nestjs/common";

import { SessionType } from "src/guards/session.guard";

import { CreateGiftFormDataDto } from "../dtos/create-gift.formdata.dto";
import { UpdateGiftFormDataDto } from "../dtos/update-gift.formdata.dto";
import { Gift } from "../entities/gift.entity";

import { CreateGiftProvider } from "./create-gift.provider";
import { DeleteGiftProvider } from "./delete-gift.provider";
import { FindAllGiftsProvider } from "./find-all-gifts.provider";
import { UpdateGiftProvider } from "./update-gift.provider";

@Injectable()
export class GiftsService {
  constructor(
    private readonly createGiftProvider: CreateGiftProvider,
    private readonly findAllGiftsProvider: FindAllGiftsProvider,
    private readonly deleteGiftProvider: DeleteGiftProvider,
    private readonly updateGiftProvider: UpdateGiftProvider,
  ) {}

  public async createGift(
    greateGiftFormDataDto: CreateGiftFormDataDto,
    session: SessionType,
  ): Promise<void> {
    return this.createGiftProvider.createGift(greateGiftFormDataDto, session);
  }

  public async findAll(session: SessionType): Promise<Gift[]> {
    return this.findAllGiftsProvider.findAll(session);
  }

  public async findOne(id: number, session: SessionType): Promise<Gift> {
    return this.updateGiftProvider.findGift(id, session);
  }

  public async deleteGift(id: number, session: SessionType): Promise<void> {
    return this.deleteGiftProvider.deleteGift(id, session);
  }
  public async updateGift(
    id: number,
    updateGiftFormDataDto: UpdateGiftFormDataDto,
    session: SessionType,
  ): Promise<void> {
    return this.updateGiftProvider.updateGift(
      id,
      updateGiftFormDataDto,
      session,
    );
  }
}
