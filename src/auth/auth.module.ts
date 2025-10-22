import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BryptService } from './hash/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';


@Global() // um módulo global pode ser usado na aplicação inteira sem precisar importar em cada módulo
@Module({
  imports: [
    PrismaModule
  ],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BryptService
    },
    AuthService
  ],
  exports: [
    HashingServiceProtocol
  ],
  controllers: [AuthController]
})
export class AuthModule { }
