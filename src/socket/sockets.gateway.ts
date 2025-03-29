import { SessionType } from "src/guards/session.guard";
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { IncomingMessage } from "http";
import { Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class Gateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor() {}
  handleConnection(client: Socket) {
    const request = client.request as IncomingMessage & {
      session?: SessionType;
    };
  }

  @SubscribeMessage("init")
  public async initUserId(client: Socket, @MessageBody() data: string) {
    const request = client?.request as IncomingMessage & {
      session?: SessionType;
    };

    const roomId = request?.session?.roomId;

    if (roomId) {
      client.join(roomId);
      this.server.to(roomId).emit("init");
    }
  }

  public sendMessage(roomId: string, message: string) {
    this.server.to(roomId).emit("message", {
      data: message,
    });
  }
}
