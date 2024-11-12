import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    if (!profile || !profile.name || !profile.emails) {
      throw new Error('Invalid profile');
    }
    const { name, emails } = profile;
    if (!name || !emails || !emails[0] || !emails[0].value) {
      throw new Error('Invalid profile data');
    }
    const user = await this.authService.validateUser({
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    });
    return user || null;
  }
}
