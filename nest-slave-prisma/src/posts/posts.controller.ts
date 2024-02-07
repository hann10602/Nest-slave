import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dtos/CreatePostDTO';
import { CreateGroupPostDTO } from './dtos/CreateGroupPostDTO';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getGroupPost() {
    return this.postsService.getGroupPort();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...createPostDTO }: CreatePostDTO) {
    return this.postsService.createPost(userId, createPostDTO);
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(
    @Body() { userIds, ...createGroupPostDTO }: CreateGroupPostDTO,
  ) {
    return this.postsService.createGroupPost(userIds, createGroupPostDTO);
  }
}
