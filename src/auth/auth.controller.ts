/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './common/guards/jwt-refresh.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  [x: string]: any;
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    // For now we just pass user data to service
    return this.authService.login(body);
  }
  @Post('refreshFromSwagger')
  @ApiBody({ type: RefreshTokenDto }) // Shows input box in Swagger
  async refreshFromSwagger(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token required');
    }

    try {
      // Verify refresh token using AuthService
      const userId = await this.authService.verifyRefreshToken(refreshToken);
      return this.authService.refreshTokens(+userId);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req) {
    const userId = req.user.sub;
    return this.authService.refreshTokens(userId);
  }
}
