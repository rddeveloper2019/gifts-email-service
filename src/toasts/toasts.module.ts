import { SocketModule } from "./../socket/socket.module";
import { Module } from "@nestjs/common";
import { ToastsService } from "./toasts.service";

@Module({
  imports: [SocketModule],
  providers: [ToastsService],
  exports: [ToastsService],
})
export class ToastsModule {}
