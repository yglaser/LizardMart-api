import { User as PrismaUser } from '@prisma/client';

export class User {
  id: string;
  email: string;
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static fromPrisma(user: PrismaUser): User {
    return new User({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    });
  }
}
