import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ServerResponse } from 'http';
import { ResponseMessage } from './responseMessage';

@Catch()
export class ExceptionsHandlerFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    if (!(exception instanceof ServerResponse)) {
      const { httpAdapter } = this.httpAdapterHost;

      const ctx = host.switchToHttp();

      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : (exception as any)?.statusCode || HttpStatus.BAD_REQUEST;

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        message: ResponseMessage.internal_server_error,
        exception_message: (exception as any)?.message || undefined,
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
}
