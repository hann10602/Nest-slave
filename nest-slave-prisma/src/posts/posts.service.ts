import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  createGroupPost(
    userIds: number[],
    data: Prisma.GroupPostCreateWithoutUserInput,
  ) {
    return this.prisma.groupPost.create({
      data: {
        ...data,
        user: {
          create: userIds.map((userId) => ({ userId })),
        },
      },
    });
  }

  getGroupPort() {
    return this.prisma.groupPost.findMany({
      include: {
        user: {
          select: {
            user: true,
          },
        },
      },
    });
  }
}
