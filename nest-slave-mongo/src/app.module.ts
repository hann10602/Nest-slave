import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    UserModule,
    PostsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest-slave'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
