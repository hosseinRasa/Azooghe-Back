import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    response.status(status).json({
      success: false,
      statusCode: status, // current HTTP status

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: (exception.message as string).includes('E11000 duplicate key')
        ? 'اطلاعات تکراری است'
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (exception.message as string) || 'Internal server error',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      error: exception.response || null,
      timestamp: new Date().toISOString(),
    });
  }
}
