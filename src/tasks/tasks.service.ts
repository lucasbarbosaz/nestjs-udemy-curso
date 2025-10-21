import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  listAllTasks() {
    return [ 
      { id: 1, task: "Estudar NestJS" }
    ]
  }

  findOneTask() {
    return "Tarefa Flavio teste...";
  }
}
