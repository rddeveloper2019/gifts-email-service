import { Injectable } from "@nestjs/common";
import { Gateway } from "../socket/sockets.gateway";
import { ToastTypes } from "./enum/toasts.enum";

@Injectable()
export class ToastsService {
  constructor(private gateway: Gateway) {}

  public sendMessage(roomId: string, type: ToastTypes, body: string) {
    return this.gateway.sendMessage(
      roomId,
      JSON.stringify({
        type,
        body,
      }),
    );
  }
}
