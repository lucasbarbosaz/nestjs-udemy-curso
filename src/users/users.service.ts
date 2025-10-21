import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto || {};

    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: 'desc'
      },
    })

    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: { //select só retorna os campos desejados
        id: true,
        email: true,
        name: true
      }
    })

    if (user) return user;

    throw new HttpException("Esse usuário não existe!", HttpStatus.NOT_FOUND);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          passwordHash: createUserDto.password
        },
        select: { //select só retorna os campos desejados
          id: true,
          email: true,
          name: true
        }
      })

      return user;
    } catch (err) {
      throw new HttpException("Erro ao criar o usuário!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id }
      })

      if (!user) {
        throw new HttpException("Esse usuário não existe!", HttpStatus.NOT_FOUND);
      }

      const updateUser = await this.prisma.user.update({
        where: { id },
        data: {
          name: updateUserDto.name ? updateUserDto.name : user.name,
          passwordHash: updateUserDto.password ? updateUserDto.password : user.passwordHash,
        },
        select: { //select só retorna os campos desejados
          id: true,
          email: true,
          name: true
        }
      })

      return updateUser
    } catch (err) {
      throw new HttpException("Erro ao atualizar o usuário!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {

      const user = this.prisma.user.findFirst({
        where: { id }
      })

      if (!user) {
        throw new HttpException("Esse usuário não existe!", HttpStatus.NOT_FOUND);
      }

      await this.prisma.user.delete({
        where: { id }
      })

      return { message: "Usuário deletado com sucesso!" };
    } catch (err) {
      throw new HttpException("Erro ao deletar o usuário!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
