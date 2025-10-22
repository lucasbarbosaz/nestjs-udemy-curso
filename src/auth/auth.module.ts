import { Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BryptService } from './hash/bcrypt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BryptService
    }
  ],
})
export class AuthModule { }
