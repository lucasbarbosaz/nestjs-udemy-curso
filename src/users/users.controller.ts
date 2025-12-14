import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import type { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/auth/common/auth.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  findAllUsers(@Query() paginationDto?: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(":id")
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    console.log("Token teste:", process.env.TOKEN_KEY);
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @UseGuards(AuthTokenGuard)
  @Patch(":id")
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    console.log("req: ", req[REQUEST_TOKEN_PAYLOAD_NAME]);
    return this.userService.update(id, updateUserDto);
  }


  @Delete(":id")
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
