import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Gateway } from "src/socket/sockets.gateway";
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
