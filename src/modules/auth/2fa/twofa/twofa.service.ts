import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class TwoFAService {
  generateSecret(userEmail: string) {
    const secret = speakeasy.generateSecret({
      name: `MyApp (${userEmail})`,
    });

    return {
      base32: secret.base32,
      otpauth_url: secret.otpauth_url,
    };
  }

  async generateQRCode(otpauth_url: string) {
    return QRCode.toDataURL(otpauth_url);
  }

  verifyCode(secret: string, code: string) {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
    });
  }
}
