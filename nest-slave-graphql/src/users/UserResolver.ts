import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { mockUsers } from 'src/__mock__/mockUser';
import { UserSettings } from '../graphql/models/UserSetting';
import { mockUserSettings } from 'src/__mock__/mockUserSettings';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { UserService } from './UserService';

@Resolver((of) => User)
export class UserResvoler {
  constructor(private userService: UserService) {}

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int, name: 'userById' }) id: number) {
    return mockUsers.find((user) => user.id === id);
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    return this.userService.getUsers();
  }

  @ResolveField((returns) => UserSettings, { nullable: true, name: 'settings' })
  getUserSettings(@Parent() user: User) {
    return mockUserSettings.find(
      (setting) => setting.userId === user.id && setting,
    );
  }

  @Mutation((returns) => User)
  createUser(@Args('CreateUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
