import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const task = this.tasks.find(task => task.id === Number(id)) // verificando se o id da task é igual ao id passado como parâmetro

    if (task) return task;

    throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
    //throw new NotFoundException("Essa tarefa não existe!");
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

  update(id: string, body: any) {
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...taskItem,
      ...body
    };


    return "Tarefa atualizada com sucesso!";
  }

  delete(id: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(taskIndex, 1);


    return `Tarefa de id ${id} deletada com sucesso!`;
  }
}
