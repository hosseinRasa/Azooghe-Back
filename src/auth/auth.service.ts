/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async verifyRefreshToken(refreshToken: string): Promise<string> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: 'YOUR_REFRESH_SECRET', // use env var in production
    });
    return payload.sub; // userId
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async validateUser(username: string, password: string) {
    // TODO: Check DB here

    const user = await this.userService.login(username, password);
    if (user) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(body: LoginDto) {
    const user = await this.validateUser(body.username, body.password);

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id },
      { secret: 'YOUR_ACCESS_SECRET', expiresIn: '60m' },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { secret: 'YOUR_REFRESH_SECRET', expiresIn: '7d' },
    );

    // TODO: Save hashed refresh token in DB for user

    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId },
      { secret: 'YOUR_ACCESS_SECRET', expiresIn: '60m' },
    );

    const newRefreshToken = await this.jwtService.signAsync(
      { sub: userId },
      { secret: 'YOUR_REFRESH_SECRET', expiresIn: '7d' },
    );

    return { accessToken, refreshToken: newRefreshToken };
  }
}
