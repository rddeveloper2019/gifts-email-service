import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Gateway } from "src/socket/sockets.gateway";

@Injectable()
export class ToastsService {
  constructor(private gateway: Gateway) {}

  public sendMessage(message: string) {
    return this.gateway.sendMessage(message);
  }
}
