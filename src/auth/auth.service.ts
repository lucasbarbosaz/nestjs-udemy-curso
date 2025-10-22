import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async authenticate(signInDto: SignInDto) {

    const user = await this.prisma.user.findFirst({
      where: { email: signInDto.email }
    })

    const passwordMatch = await this.hashingService.compare(signInDto.password, user?.passwordHash || '')

    if (!user || !passwordMatch) {
      throw new HttpException("E-mail ou senha inválidos!", HttpStatus.UNAUTHORIZED);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name
    }

  }
}
