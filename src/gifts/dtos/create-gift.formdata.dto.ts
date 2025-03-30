import { Transform } from "class-transformer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from "nestjs-form-data";

export class CreateGiftFormDataDto {
  @IsOptional()
  @Transform(({ value }) => (value === "" ? null : value))
  logo?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType([
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/bmp",
    "application/pdf",
  ])
  file: FileSystemStoredFile;
}
