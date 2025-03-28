import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let messages = ["Произошла ошибка"];

    if (exception instanceof BadRequestException) {
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

     response.status(status).render("error-page", {
      title: "Ошибка",
      messages,
      statusCode: status,
      path: request.url,
    });
  }
}
