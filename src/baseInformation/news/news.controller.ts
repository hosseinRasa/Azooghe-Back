import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { DeleteResult } from 'mongoose';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/common/guards/jwt-auth.guard';
import { NewsService } from './news.service';
import { NewsCreateDto } from './dto/news-create.dto';
import { UpdateNewsDto } from './dto/news-update.dto';
import { AllowAnonymous } from '../../auth/common/decorators/allow-anonymous.decorator';

@Controller('news')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class NewsController {
  /**
   *
   */
  constructor(private readonly newsService: NewsService) {}
  @Get()
  @ApiQuery({ name: 'description', required: false })
  @AllowAnonymous()
  findAll(@Query('description') description?: string) {
    return this.newsService.findAll(description);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.newsService.findById(id);
  }
  @Post()
  create(@Body(ValidationPipe) newsCreateDto: NewsCreateDto) {
    return this.newsService.create(newsCreateDto);
  }
  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body() updatenewsDto: UpdateNewsDto,
  ) {
    return this.newsService.update(id, updatenewsDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.newsService.delete(id);
  }
}
