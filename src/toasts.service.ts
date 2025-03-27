import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Gateway } from "./sockets.gateway";

@Injectable()
export class ToastsService {
  constructor(
    @Inject(forwardRef(() => Gateway))
    private socket: Gateway,
  ) {}

  public sendMessage(message: string) {
    return this.socket.sendMessage(message);
  }
}
