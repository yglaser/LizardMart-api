import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

export class MicrosoftStrategy extends PassportStrategy(
  BearerStrategy,
  'microsoft',
) {
  constructor() {
    super({
      identityMetadata:
        'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      clientID: 'MICROSOFT_CLIENT_ID',
    });
  }

  async validate(token: any) {
    return token;
  }
}
