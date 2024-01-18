import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSettings } from '../models/UserSetting';
import { CreateUserSettingsInput } from '../utils/CreateUserSettings';
import { UserSettingsService } from './UserSettingsService';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingsService) {}

  @Mutation((returns) => UserSettings)
  async createUserSettings(
    @Args('CreateUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    const newUserSettingsData = { ...createUserSettingsData };

    return await this.userSettingsService.createUserSettings(
      newUserSettingsData,
    );
  }
}
