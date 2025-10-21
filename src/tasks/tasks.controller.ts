import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() body: any) {
    console.log("ID: ", id);
    console.log("Body: ", body);
    return `Tarefa de id ${id} atualizada com sucesso!`;
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    console.log("ID: ", id);
    return `Tarefa de id ${id} deletada com sucesso!`;
  }
}
