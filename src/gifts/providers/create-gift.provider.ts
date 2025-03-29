import { Injectable } from "@nestjs/common";
import { basename, resolve } from "path";
import { SessionType } from "src/guards/session.guard";
import { CreateGiftFormDataDto } from "../dtos/create-gift.formdata.dto";

@Injectable()
export class CreateGiftProvider {
  public async createGift(
    greateGiftFormDataDto: CreateGiftFormDataDto,
    session: SessionType,
  ): Promise<void> {
    console.log("(**)=> : greateGiftFormDataDto", greateGiftFormDataDto);
    console.log("(**)=> : session", session);
    const { file, logo, description, name } = greateGiftFormDataDto;
    console.log("(**)=> file.extensionWithSource: ", file.extensionWithSource);
    console.log("(**)=> resolve(file.path): ", resolve(file.path));
    console.log("(**)=> basename(file.path): ", basename(file.path));

    return;
  }
}
