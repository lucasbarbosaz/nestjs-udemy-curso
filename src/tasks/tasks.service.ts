import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  

  private tasks: Task[] = [
    {
      id: 1,
      name: "Estudar NestJS",
      description: "Estudar o framework NestJS para construir aplicações backend escaláveis.",
      completed: false
    }
  ]

  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id }
    })

    if (task?.id) return task;

    throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
    //throw new NotFoundException("Essa tarefa não existe!");
  }

  create(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length + 1; // gerando um novo id baseado no tamanho do array

    const newTask: Task = {
      id: newId,
      ...createTaskDto,
      completed: false
    }

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex < 0) {
      throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...taskItem,
      ...updateTaskDto
    };


    return this.tasks[taskIndex];
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex < 0) {
      throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(taskIndex, 1);


    return {
      message: "Tarefa deletada com sucesso!"
    }
  }
}
