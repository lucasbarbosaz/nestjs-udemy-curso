import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }


  async findAll(paginationDto?: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto || {};

      const allTasks = await this.prisma.task.findMany({
        take: limit, //take -> limite de itens
        skip: offset, //skip -> pular itens
        orderBy: {
          id: 'desc'
        }
      });

      return allTasks;
    } catch (err) {
      throw new HttpException("Erro ao buscar as tarefas!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.prisma.task.findFirst({
        where: { id }
      })

      if (task?.id) return task;

      throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
      //throw new NotFoundException("Essa tarefa não existe!");
    } catch (err) {
      throw new HttpException("Erro ao buscar a tarefa!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          completed: false
        }
      })

      return newTask;
    } catch (err) {
      throw new HttpException("Erro ao criar a tarefa!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: { id }
      });

      if (!findTask) {
        throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
      }

      const task = await this.prisma.task.update({
        where: { id },
        data: updateTaskDto
      })

      return task;
    } catch (err) {
      throw new HttpException("Erro ao atualizar a tarefa!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: { id }
      });

      if (!findTask) {
        throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
      }

      const task = await this.prisma.task.delete({
        where: { id }
      })

      return task;
    } catch (err) {
      throw new HttpException("Erro ao deletar a tarefa!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
