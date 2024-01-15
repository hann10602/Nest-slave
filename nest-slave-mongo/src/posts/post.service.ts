import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/Post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/Post.schema';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost(userId: string, post: CreatePostDTO) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('User doesn`t exist', HttpStatus.BAD_REQUEST);
    }

    const newPost = new this.postModel(post);
    const savedPost = await newPost.save();
    await user.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });

    return savedPost;
  }
}
