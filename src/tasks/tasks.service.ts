import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

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

  findOne(id: string) {
    return this.tasks.find( task => task.id === Number(id) ) // verificando se o id da task é igual ao id passado como parâmetro
  }

  create(body: any) {
    const newId = this.tasks.length + 1; // gerando um novo id baseado no tamanho do array
    const newTask: Task = {
      id: newId,
      ...body
    }

    this.tasks.push(newTask);

    return newTask;
  }
}
