import { User } from "./../auth/entities/user.entity";
import { Module, forwardRef } from "@nestjs/common";
import { GiftsService } from "./providers/gifts.service";
import { CreateGiftProvider } from "./providers/create-gift.provider";
import { GiftsController } from "./gifts.controller";
import { FileSystemStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gift } from "./entities/gift.entity";
import { AuthModule } from "src/auth/auth.module";
import { ToastsModule } from "src/toasts/toasts.module";
import { FindAllGiftsProvider } from "./providers/find-all-gifts.provider";
import { DeleteGiftProvider } from "./providers/delete-gift.provider";

const uploadPath = join(process.cwd(), "uploaded-files");

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: uploadPath,
      cleanupAfterSuccessHandle: false,
    }),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Gift, User]),
    ToastsModule,
  ],
  providers: [
    GiftsService,
    CreateGiftProvider,
    FindAllGiftsProvider,
    DeleteGiftProvider,
  ],
  controllers: [GiftsController],
  exports: [GiftsService],
})
export class GiftsModule {}
