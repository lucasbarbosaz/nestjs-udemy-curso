import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  // @Query('limit') limit: string
  findAllTasks() {
    return this.tasksService.findAll()
  }
  
  @Get(":id")
  findOneTask(@Param("id") id: string) {
    return this.tasksService.findOne(id);
  }

  @Post("")
  createTask(@Body() body: any) {
    return this.tasksService.create(body);
  }
}
