import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  private tasks: Task[] = [
    {
      id: 1,
      name: "Estudar NestJS",
      description: "Estudar o framework NestJS para construir aplicações backend escaláveis.",
      completed: false
    }
  ]

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find(task => task.id === id) // verificando se o id da task é igual ao id passado como parâmetro

    if (task) return task;

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
