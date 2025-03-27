import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ToastsModule } from "./toasts/toasts.module";
import { SocketModule } from "./socket/socket.module";

@Module({
  imports: [AuthModule, ToastsModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
