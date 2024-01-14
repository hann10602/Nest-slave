import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  fetchUsers() {
    return this.userRepository.find();
  }

  createUser(dto: CreateUserDTO) {
    const newUser = this.userRepository.create({
      ...dto,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, dto: UpdateUserDTO) {
    return this.userRepository.update({ id }, { ...dto });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
