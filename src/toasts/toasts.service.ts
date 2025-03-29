import { Injectable } from "@nestjs/common";
import { Gateway } from "../socket/sockets.gateway";
import { ToastTypes } from "./enum/toasts.enum";

@Injectable()
export class ToastsService {
  constructor(private gateway: Gateway) {}

  public sendMessage(userId: string, type: ToastTypes, body: string) {
    return this.gateway.sendMessage(
      userId,
      JSON.stringify({
        type,
        body,
      }),
    );
  }
}
