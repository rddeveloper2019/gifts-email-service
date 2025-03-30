import { Transform } from "class-transformer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateGiftFormDataDto {
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
}
