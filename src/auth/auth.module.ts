import { AppModule } from "./../app.module";
import { Module } from "@nestjs/common";
import { ToastsService } from "src/toasts.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignInProvider } from "./providers/sign-in.provider";
import { SignUpProvider } from "./providers/sign-up.provider";

@Module({
  imports: [AppModule],
  controllers: [AuthController],
  providers: [AuthService, SignInProvider, SignUpProvider],
})
export class AuthModule {}
