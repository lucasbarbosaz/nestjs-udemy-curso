import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  getTasks() {
    return this.tasksService.listAllTasks()
  }

  @Get('/teste')
  getTeste() {
    return "Teste tarefas"
  }
  
  @Get("/1")
  findOneTask() {
    return this.tasksService.findOneTask();
  }
}
