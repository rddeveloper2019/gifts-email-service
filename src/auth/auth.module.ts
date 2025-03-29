import { Module } from "@nestjs/common";
import {
  FileSystemStoredFile,
  MemoryStoredFile,
  NestjsFormDataModule,
} from "nestjs-form-data";
import { ToastsModule } from "../toasts/toasts.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignInProvider } from "./providers/sign-in.provider";
import { CreateUserProvider } from "./providers/create-user.provider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { profileConfig } from "./config/profile.config";
import { User } from "./entities/user.entity";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { GenerateTokensProvider } from "./providers/generate-tokens.provider";
import jwtConfig from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { RefreshTokensProvider } from "./providers/refresh-tokens.provider";

@Module({
  imports: [
    ToastsModule,
    NestjsFormDataModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInProvider,
    CreateUserProvider,
    BcryptProvider,
    GenerateTokensProvider,
    RefreshTokensProvider,
  ],
})
export class AuthModule {}
