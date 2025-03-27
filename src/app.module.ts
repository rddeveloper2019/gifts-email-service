import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { Gateway } from "./sockets.gateway";
import { ToastsService } from "./toasts.service";

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, Gateway],
})
export class AppModule {}
