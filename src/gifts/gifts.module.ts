import { Module } from "@nestjs/common";
import { GiftsService } from "./providers/gifts.service";
import { CreateGiftProvider } from "./providers/create-gift.provider";
import { GiftsController } from "./gifts.controller";
import { FileSystemStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { join } from "path";

const uploadPath = join(process.cwd(), "uploaded-files");

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: uploadPath,
      cleanupAfterSuccessHandle: false,
    }),
  ],
  providers: [GiftsService, CreateGiftProvider],
  controllers: [GiftsController],
})
export class GiftsModule {}
