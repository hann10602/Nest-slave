import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSettings } from '../models/UserSetting';
import { CreateUserSettingsInput } from '../utils/CreateUserSettings';
import { mockUserSettings } from 'src/__mock__/mockUserSettings';

@Resolver((of) => UserSettings)
export class UserSettingsResolver {
  @Mutation((returns) => UserSettings)
  createUserSettings(
    @Args('CreateUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    const newUserSettingsData = { ...createUserSettingsData };
    mockUserSettings.push(newUserSettingsData);

    return newUserSettingsData;
  }
}
