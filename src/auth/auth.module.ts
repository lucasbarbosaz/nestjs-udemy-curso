import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BryptService } from './hash/bcrypt.service';


@Global() // um módulo global pode ser usado na aplicação inteira sem precisar importar em cada módulo
@Module({
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BryptService
    }
  ],
  exports: [
    HashingServiceProtocol
  ]
})
export class AuthModule { }
