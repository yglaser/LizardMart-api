import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../users/repositories/users.repository';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
interface OAuthProfile {
  id: string;
  provider: string;
  displayName?: string;
  emails?: { value: string }[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
  ) {}

  async validateOAuthUser(profile: OAuthProfile) {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      throw new Error('Email not provided by OAuth provider');
    }

    // 1️⃣ Try to find existing user
    let user = await this.usersRepository.findByProvider(
      profile.provider,
      profile.id,
    );

    // 2️⃣ If not found → create user
    if (!user) {
      user = await this.usersRepository.create({
        email,
        name: profile.displayName,
        provider: profile.provider,
        providerId: profile.id,
      });
    }

    return user;
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  generateJwt(user: { id: string; email: string }) {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }

  async register(data: any) {
    const existingUser = await this.usersService.findByEmail(data.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    return {
      message: 'User created',
      user,
    };
  }
}
