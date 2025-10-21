import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable() // decorator necessário para injeção de dependência
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    console.log(`[REQUEST] ${method} ${url} - ${new Date().toISOString()}`);

    return next.handle().pipe(
      tap(() => { // tap é executado quando a resposta está prestes a ser enviada
        console.log(`[RESPONSE] ${method} ${url} - ${Date.now() - now}ms`);
      })
    );
  }
}