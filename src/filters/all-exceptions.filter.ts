import { SessionType } from "src/guards/session.guard";
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ToastsService } from "../toasts/toasts.service";
import { ToastTypes } from "src/toasts/enum/toasts.enum";
const pagesMap = {
  "/auth/sign-up": "signup-page",
  "/auth/sign-in": "signin-page",
  "/gifts/gift-form": "gifts-page",
  "/gift-form": "gifts-page",
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(ToastsService)
    private readonly toastsService: ToastsService,
  ) {}
  catch(exception: Error, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      let status = 500;
      let messages = ["Произошла ошибка"];
      const session = request.session as SessionType;

      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as
          | string
          | (object & { message: string | string[] });
        if (
          typeof exceptionResponse === "object" &&
          "message" in exceptionResponse
        ) {
          messages = Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message
            : [exceptionResponse.message];
        }
      }

      const page = pagesMap[request?.url] || "error-page";

      console.log("(**)=> AllExceptionsFilter: ", {
        messages,
        statusCode: status,
        path: request.url,
      });

      if (exception instanceof UnauthorizedException) {
        response.status(status).render("signin-page", {
          pageTitle: "Authorization Required",
          messages,
        });

        return;
      }

      response.status(status).render(page, {
        pageTitle: "Error",
        messages,
        statusCode: status,
        path: request.url,
        roomId: session.roomId,
      });

      if (session?.roomId) {
        messages.forEach((message) => {
          this.toastsService.sendMessage(
            session?.roomId,
            ToastTypes.DANGER,
            message,
          );
        });
      }
    } catch (error) {
      console.log("(**)=> AllExceptionsFilter error: ", error);
    }
  }
}
