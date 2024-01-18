import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { mockUserSettings } from 'src/__mock__/mockUserSettings';
import { User } from '../graphql/models/User';
import { UserSettings } from '../graphql/models/UserSetting';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { UserService } from './UserService';
import { UserSettingsService } from 'src/graphql/resolvers/UserSettingsService';

@Resolver((of) => User)
export class UserResvoler {
  constructor(
    private userService: UserService,
    private userSettingsService: UserSettingsService,
  ) {}

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int, name: 'userById' }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    return this.userService.getUsers();
  }

  @ResolveField((returns) => UserSettings, { nullable: true, name: 'settings' })
  getUserSettings(@Parent() user: User) {
    return this.userSettingsService.getUserSettingById(user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('CreateUserData') createUserData: CreateUserInput) {
    console.log('settings ' + JSON.stringify(createUserData));
    return this.userService.createUser(createUserData);
  }
}
