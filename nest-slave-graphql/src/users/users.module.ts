import { Module } from '@nestjs/common';
import { UserResvoler } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserResvoler, UserService],
})
export class UsersModule {}
