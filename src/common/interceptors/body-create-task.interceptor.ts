import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable() // decorator necessário para injeção de dependência
export class BodyCreateTaskInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    console.log(`[CREATE TASK INTERCEPTOR] ${method} ${url} - Body: ${JSON.stringify(body)} - ${new Date().toISOString()}`);

    return next.handle();
  }
}