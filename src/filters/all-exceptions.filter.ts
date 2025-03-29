import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";

const pagesMap = {
  "/auth/sign-up": "signup-page",
  "/auth/sign-in": "signin-page",
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let messages = ["Произошла ошибка"];

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
    });
  }
}
