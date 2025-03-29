// src/websocket/session-adapter.ts
import { IoAdapter } from "@nestjs/platform-socket.io";
import session from "express-session";
import cookieParser from "cookie-parser";
import { ServerOptions } from "socket.io";
import { RequestHandler } from "express";

export class SessionAdapter extends IoAdapter {
  private session: RequestHandler;
  private cookieParser: RequestHandler;

  constructor(app: any, secret: string = "") {
    super(app);
    this.session = session({
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      },
    });
    this.cookieParser = cookieParser();
  }

  create(port: number, options?: ServerOptions): any {
    const server = super.create(port, options);

    server.use((socket: any, next: any) => {
      const req = socket.request as any;
      const res = { end: () => {} } as any;

      this.cookieParser(req, res, () => {
        this.session(req, res, (err) => {
          if (err) return next(err);
          socket.request.session = req.session;
          next();
        });
      });
    });

    return server;
  }
}
