import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
src/app.module.ts: Modulo principal do aplicativo
src/app.controller.ts: Define as rotas e lida com requisições.
src/app.service.ts: Contém a lógica de negocio, separado do controller.
*/

// Arquivo que inicia nosso projeto NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // se TRUE, remove propriedades não definidas no DTO
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
