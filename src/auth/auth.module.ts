import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BryptService } from './hash/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';


@Global() // um módulo global pode ser usado na aplicação inteira sem precisar importar em cada módulo
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BryptService
    },
    AuthService
  ],
  exports: [
    HashingServiceProtocol,
    JwtModule,
    ConfigModule,
  ],
  controllers: [AuthController]
})
export class AuthModule { }
