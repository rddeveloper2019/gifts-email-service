import { Module } from "@nestjs/common";
import { Gateway } from "./sockets.gateway";

@Module({ providers: [Gateway], exports: [Gateway] })
export class SocketModule {}
