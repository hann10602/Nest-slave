import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/__mock__/mockUser';
import { UserSettings } from '../models/UserSetting';
import { mockUserSettings } from 'src/__mock__/mockUserSettings';

@Resolver((of) => User)
export class UserResvoler {
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int, name: 'userById' }) id: number) {
    return mockUsers.find((user) => user.id === id);
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    return mockUsers;
  }

  @ResolveField((returns) => UserSettings, { nullable: true, name: 'settings' })
  getUserSettings(@Parent() user: User) {
    return mockUserSettings.find(
      (setting) => setting.userId === user.id && setting,
    );
  }
}
