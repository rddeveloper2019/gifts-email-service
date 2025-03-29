import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignInFormDataDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
