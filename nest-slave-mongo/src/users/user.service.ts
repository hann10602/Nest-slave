import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDTO, UpdateUserDTO } from './dto/User.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingModel: Model<UserSettings>,
  ) {}

  getUsers() {
    return this.userModel.find();
  }

  async getUser(id: string) {
    return await this.userModel.findById(id);
  }

  createUser(dto: CreateUserDTO) {
    const newUser = new this.userModel(dto);

    return newUser.save();
  }

  updateUser(id: string, dto: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
