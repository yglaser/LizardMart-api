import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: 'FACEBOOK_APP_ID',
      clientSecret: 'FACEBOOK_SECRET',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
}
