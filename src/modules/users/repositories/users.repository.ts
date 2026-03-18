import { Injectable } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<PrismaUser> {
    return this.prisma.user.create({ data });
  }

  findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
  findByProvider(
    provider: string,
    providerId: string,
  ): Promise<PrismaUser | null> {
    return this.prisma.user.findFirst({
      where: {
        provider,
        providerId,
      },
    });
  }
  update(id: string, data: Prisma.UserUpdateInput): Promise<PrismaUser> {
    return this.prisma.user.update({ where: { id }, data });
  }

  delete(id: string): Promise<PrismaUser> {
    return this.prisma.user.delete({ where: { id } });
  }
}
