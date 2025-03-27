import { Module } from "@nestjs/common";
import { ToastsModule } from "src/toasts/toasts.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignInProvider } from "./providers/sign-in.provider";
import { SignUpProvider } from "./providers/sign-up.provider";

@Module({
  imports: [ToastsModule],
  controllers: [AuthController],
  providers: [AuthService, SignInProvider, SignUpProvider],
})
export class AuthModule {}
