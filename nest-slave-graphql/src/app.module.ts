import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserSettingsResolver } from './graphql/resolvers/UserSettingsResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './graphql/models/User';
import { UserSettings } from './graphql/models/UserSetting';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mny10602',
      database: 'nodejs',
      entities: [User, UserSettings],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [UserSettingsResolver],
})
export class AppModule {}
