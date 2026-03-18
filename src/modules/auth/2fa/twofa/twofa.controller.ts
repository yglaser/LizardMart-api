import { Controller, Post, Body } from '@nestjs/common';
import { TwoFAService } from './twofa.service';

@Controller('2fa')
export class TwoFAController {
  constructor(private twoFAService: TwoFAService) {}

  @Post('generate')
  async generate(@Body('email') email: string) {
    const secret = this.twoFAService.generateSecret(email);
    const qr = await this.twoFAService.generateQRCode(secret.otpauth_url);

    return {
      secret: secret.base32,
      qr,
    };
  }

  @Post('verify')
  verify(@Body('secret') secret: string, @Body('code') code: string) {
    return {
      valid: this.twoFAService.verifyCode(secret, code),
    };
  }
}
