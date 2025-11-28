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
import { UnitsService } from './units.service';

import { AllowAnonymous } from '../../auth/common/decorators/allow-anonymous.decorator';
import { UpdateUnitsDto } from './dto/units-update.dto';
import { UnitsCreateDto } from './dto/units-create.dto';

@Controller('Units')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class UnitsController {
  /**
   *
   */
  constructor(private readonly UnitsService: UnitsService) {}
  @Get()
  @ApiQuery({ name: 'description', required: false })
  @AllowAnonymous()
  findAll(@Query('description') description?: string) {
    return this.UnitsService.findAll(description);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.UnitsService.findById(id);
  }
  @Post()
  create(@Body(ValidationPipe) UnitsCreateDto: UnitsCreateDto) {
    return this.UnitsService.create(UnitsCreateDto);
  }
  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body() updateUnitsDto: UpdateUnitsDto,
  ) {
    return this.UnitsService.update(id, updateUnitsDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.UnitsService.delete(id);
  }
}
