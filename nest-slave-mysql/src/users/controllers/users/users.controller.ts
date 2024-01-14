import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('api/v1/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('get-all')
  getAll(@Query('sort-by') sortBy: string) {
    console.log(sortBy);
    return this.userService.fetchUsers();
  }

  @Get('get-one/:id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return this.userService.fetchUsers();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() user: CreateUserDTO,
  ) {
    return this.userService.createUser(user);
  }

  @Put('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(id, user);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
