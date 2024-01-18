import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from '../models/UserSetting';
import { Repository } from 'typeorm';
import { CreateUserSettingsInput } from '../utils/CreateUserSettings';
import { User } from '../models/User';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUserSettingById(userId: number) {
    return this.userSettingsRepository.findOneBy({ userId });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    const user = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });

    if (!user) throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);

    const newUserSettings = this.userSettingsRepository.create(
      createUserSettingsData,
    );

    const savedUserSettings =
      await this.userSettingsRepository.save(newUserSettings);

    user.settings = savedUserSettings;

    await this.userRepository.save(user);

    return savedUserSettings;
  }
}
