import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettings } from 'src/graphql/models/UserSetting';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { UserSettingsService } from 'src/graphql/resolvers/UserSettingsService';
import { UserSettingsResolver } from 'src/graphql/resolvers/UserSettingsResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [
    UserResolver,
    UserService,
    UserSettingsService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
