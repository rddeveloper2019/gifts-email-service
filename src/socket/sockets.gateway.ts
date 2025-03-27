import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

const users = ["1", "2", "3"];

const getId = (arr: string[] = []) =>
  arr[Math.floor(Math.random() * arr.length)];

@WebSocketGateway()
export class Gateway {
  @WebSocketServer()
  private server: Socket;

  constructor() {}

  @SubscribeMessage("init")
  public async initUserId(client: Socket) {
    await fetch("https://jsonplaceholder.typicode.com/posts");
    const id = getId(users);
    client.join(id);
    this.server.to(id).emit("init");
  }

  public sendMessage(userId: string, message: string) {
    this.server.to(userId).emit("message", {
      data: message,
    });
  }
}
