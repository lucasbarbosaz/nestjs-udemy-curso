import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks() {
    return "Listando todas as tarefas!"
  }

  @Get('/teste')
  getTeste() {
    return "Teste tarefas"
  }
}
