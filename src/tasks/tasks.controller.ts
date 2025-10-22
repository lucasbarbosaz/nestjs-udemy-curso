import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
// import { AuthAdminGuard } from 'src/common/guards/admin.guard';
// import { TasksUtils } from './tasks.utils';

@Controller('tasks')
//@UseGuards(AuthAdminGuard) // aplica o guard para todas as rotas desse controller
//@UseInterceptors(LoggerInterceptor) //isso serve para todas as rotas desse controller
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
    //private readonly taskUtils: TasksUtils
  ) 
  { }

  @Get()
  @UseInterceptors(LoggerInterceptor) //isso serve apenas para essa rota
  @UseInterceptors(AddHeaderInterceptor) //isso serve apenas para essa rota
  findAllTasks(@Query() paginationDto: PaginationDto) {
    //console.log(this.taskUtils.splitString("Essa é uma frase de teste"));
    return this.tasksService.findAll(paginationDto);
  }

  @Get(":id")
  findOneTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post("")
  @UseInterceptors(BodyCreateTaskInterceptor)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(":id")
  updateTask(@Param("id", ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  deleteTask(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
