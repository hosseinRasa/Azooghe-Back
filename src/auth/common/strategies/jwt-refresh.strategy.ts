/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'), // OR cookie
      secretOrKey: 'YOUR_REFRESH_SECRET',
      passReqToCallback: true,
    });
  }

  validate(req, payload: any) {
    // refresh token string from body
    const refreshToken = req.body.refreshToken;

    return {
      sub: payload.sub,
      refreshToken,
    };
  }
}
