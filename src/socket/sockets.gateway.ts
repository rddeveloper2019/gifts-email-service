import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";

@WebSocketGateway()
export class Gateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;
  private client: Socket;

  constructor() {}
  handleConnection(client: Socket) {
    this.client = client;
  }

  @SubscribeMessage("init")
  public async initUserId(@MessageBody() { roomId = "" }: { roomId: string }) {
    if (roomId) {
      this.client?.join([roomId]);
      this.server.to(roomId).emit("init");
    }
  }

  public sendMessage(roomId: string, message: string) {
    this.server.to(roomId).emit("message", {
      data: message,
    });
  }
}
