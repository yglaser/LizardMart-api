import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll();
    return users.map((u) => User.fromPrisma(u));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.ensureExists(id);
    return User.fromPrisma(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.ensureExists(id);

    const data: Prisma.UserUpdateInput = {};

    if (dto.email !== undefined) {
      const existing = await this.usersRepository.findByEmail(dto.email);
      if (existing && existing.id !== id) {
        throw new ConflictException('Email is already in use');
      }
      data.email = dto.email;
    }

    if (dto.password !== undefined) {
      data.password = dto.password;
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided to update a user',
      );
    }

    const updated = await this.usersRepository.update(id, data);
    return User.fromPrisma(updated);
  }

  async remove(id: string): Promise<User> {
    await this.ensureExists(id);
    const deleted = await this.usersRepository.delete(id);
    return User.fromPrisma(deleted);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
    return user ? User.fromPrisma(user) : null;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existing = await this.usersRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('Email is already in use');
    }
    const created = await this.usersRepository.create(data);
    return User.fromPrisma(created);
  }
  async ensureExists(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return user;
  }
}
