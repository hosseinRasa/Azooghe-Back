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
import { OrgansService } from './organs.service';

import { AllowAnonymous } from '../../auth/common/decorators/allow-anonymous.decorator';
import { UpdateOrgansDto } from './dto/organs-update.dto';
import { OrgansCreateDto } from './dto/organs-create.dto';

@Controller('Organs')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class OrgansController {
  /**
   *
   */
  constructor(private readonly OrgansService: OrgansService) {}
  @Get()
  @ApiQuery({ name: 'description', required: false })
  @AllowAnonymous()
  findAll(@Query('description') description?: string) {
    return this.OrgansService.findAll(description);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.OrgansService.findById(id);
  }
  @Post()
  create(@Body(ValidationPipe) organsCreateDto: OrgansCreateDto) {
    return this.OrgansService.create(organsCreateDto);
  }
  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body() updateOrgansDto: UpdateOrgansDto,
  ) {
    return this.OrgansService.update(id, updateOrgansDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.OrgansService.delete(id);
  }
}
