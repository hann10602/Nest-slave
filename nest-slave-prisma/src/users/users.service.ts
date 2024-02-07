import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            notificationsOn: true,
            smsEnabled: true,
          },
        },
      },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const userExist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExist) {
      throw new HttpException('User doesn`t exist', HttpStatus.CONFLICT);
    }

    const userFindByName = await this.prisma.user.findUnique({
      where: {
        username: data.username as string,
      },
    });

    if (userFindByName) {
      throw new HttpException('Username already exist', HttpStatus.CONFLICT);
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    const userExist = await this.prisma.user.findUnique({ where: { id } });

    if (!userExist) {
      throw new HttpException('User doesn`t exist', HttpStatus.CONFLICT);
    }

    return this.prisma.user.delete({ where: { id } });
  }

  getUsers() {
    return this.prisma.user.findMany({
      include: {
        userSetting: { select: { notificationsOn: true, smsEnabled: true } },
        posts: true,
      },
    });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: { select: { notificationsOn: true, smsEnabled: true } },
      },
    });
  }

  async updateUserSettingsByUserId(
    userId: number,
    data: Prisma.UserSettingUpdateInput,
  ) {
    const userExist = await this.getUserById(userId);

    if (!userExist && !userExist.userSetting) {
      throw new HttpException('User doesn`t exist', HttpStatus.CONFLICT);
    }

    return this.prisma.userSetting.update({
      where: { userId },
      data,
    });
  }
}
