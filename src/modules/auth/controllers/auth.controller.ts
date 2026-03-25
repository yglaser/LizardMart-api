import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateLocalUser(
      body.email,
      body.password,
    );
    return {
      token: this.authService.generateJwt(user),
    };
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    const user = req.user;
    return {
      token: this.authService.generateJwt(user),
    };
  }

  @Get('microsoft')
  @Public()
  @UseGuards(AuthGuard('microsoft'))
  async microsoftLogin() {}

  @Get('microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftCallback(@Req() req) {
    const user = req.user;
    return {
      token: this.authService.generateJwt(user),
    };
  }
  // FACEBOOK
  @Get('facebook')
  @Public()
  @UseGuards(AuthGuard('facebook'))
  facebookAuth() {}

  @Get('facebook/callback')
  @Public()
  @UseGuards(AuthGuard('facebook'))
  facebookCallback(@Req() req) {
    const user = req.user;
    return {
      token: this.authService.generateJwt(user),
    };
  }
}
