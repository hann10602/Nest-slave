import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDTO } from './dto/Post.dto';
import { PostService } from './post.service';

@Controller('api/v1/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create/:userId')
  @UsePipes(new ValidationPipe())
  createPost(@Param('userId') userId: string, @Body() post: CreatePostDTO) {
    return this.postService.createPost(userId, post);
  }
}
