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
import { AllowAnonymous } from '../auth/common/decorators/allow-anonymous.decorator';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { WorkCentersService } from './work-centers.service';
import { WorkCentersCreateDto } from './dto/work-centers-create.dto';
import { UpdateWorkCentersDto } from './dto/work-centers-update.dto';

@Controller('WorkCenters')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class WorkCentersController {
  /**
   *
   */
  constructor(private readonly WorkCentersService: WorkCentersService) {}
  @Get()
  @ApiQuery({ name: 'description', required: false })
  @AllowAnonymous()
  findAll(@Query('description') description?: string) {
    return this.WorkCentersService.findAll(description);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.WorkCentersService.findById(id);
  }
  @Post()
  create(@Body(ValidationPipe) WorkCentersCreateDto: WorkCentersCreateDto) {
    return this.WorkCentersService.create(WorkCentersCreateDto);
  }
  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body() updateWorkCentersDto: UpdateWorkCentersDto,
  ) {
    return this.WorkCentersService.update(id, updateWorkCentersDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.WorkCentersService.delete(id);
  }
}
