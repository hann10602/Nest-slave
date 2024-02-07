import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateUserDTO } from './dtos/UpdateUser.dto';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserSettingsDTO } from './dtos/UpdateUserSettingsDTO';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('get-all')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('get-one/:id')
  getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createUser(createUserDTO);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.usersService.updateUser(id, updateUserDTO);
  }

  @Patch(':id/settings')
  updateUserSettingsByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSettingsDTO: UpdateUserSettingsDTO,
  ) {
    return this.usersService.updateUserSettingsByUserId(
      id,
      updateUserSettingsDTO,
    );
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
