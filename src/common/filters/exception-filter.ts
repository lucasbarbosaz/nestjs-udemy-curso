import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    console.log("[EXCEPTION FILTER] Capturou uma exceção HTTP");

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: errorResponse !== "" ? errorResponse : "Erro ao realizar essa operação",
      path: request.url
    })

  }
}