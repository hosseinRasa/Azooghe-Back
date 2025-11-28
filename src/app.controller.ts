import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { toJalali } from './common/utility/date';

@Controller()
// @UseGuards(JwtAuthGuard) // <-- Protects the route
// @ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  init(): string {
    return toJalali(new Date());
  }
}
