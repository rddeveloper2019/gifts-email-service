import { SessionType } from "src/guards/session.guard";
import { session } from "express-session";
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { IncomingMessage } from "http";
import { Socket } from "socket.io";

const users = ["1", "2", "3"];

const getId = (arr: string[] = []) =>
  arr[Math.floor(Math.random() * arr.length)];

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

    // Пример проверки аутентификации
    if (!request.session?.token || !request.session?.roomId) {
      client.disconnect(true);
      return;
    }
  }

  @SubscribeMessage("init")
  public async initUserId(client: Socket) {
    const request = client.request as IncomingMessage & {
      session?: SessionType;
    };

    const roomId = request.session?.roomId;
    await fetch("https://jsonplaceholder.typicode.com/posts");

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
