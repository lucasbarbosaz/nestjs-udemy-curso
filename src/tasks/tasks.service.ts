import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
    return [ 
      { id: 1, task: "Estudar NestJS" }
    ]
  }

  findOne(id: string) {
    return "Buscando a tarefa de id " + id;
  }
}
