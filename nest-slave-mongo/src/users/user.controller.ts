import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './dto/User.dto';
import { UserService } from './user.service';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';

@Controller('api/v1/users')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-all')
  getUSers() {
    return this.userService.getUsers();
  }

  @Get('get-one/:id')
  getUser(@Param('id') id: string) {
    const isvalid = mongoose.Types.ObjectId.isValid(id);
    if (!isvalid) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return this.userService.getUser(id);
  }

  @Post('create')
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userService.updateUser(id, user);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return this.userService.deleteUser(id);
  }
}
