import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

const users = ["1", "2", "3"];
const ttypes = ["warning", "success", "danger"];
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

  public sendMessage(message: string) {
    const clId = getId(users);

    this.server.to(clId).emit("message", {
      data: JSON.stringify({
        type: getId(ttypes),
        body: `Your  id: ${clId}\n${message}`,
      }),
    });
  }
}
