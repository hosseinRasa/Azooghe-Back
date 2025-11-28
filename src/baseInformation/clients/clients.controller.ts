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
import { ClientsService } from './clients.service';

import { AllowAnonymous } from '../../auth/common/decorators/allow-anonymous.decorator';
import { UpdateClientsDto } from './dto/clients-update.dto';
import { ClientsCreateDto } from './dto/clients-create.dto';

@Controller('Clients')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class ClientsController {
  /**
   *
   */
  constructor(private readonly ClientsService: ClientsService) {}
  @Get()
  @ApiQuery({ name: 'description', required: false })
  @AllowAnonymous()
  findAll(@Query('description') description?: string) {
    return this.ClientsService.findAll(description);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ClientsService.findById(id);
  }
  @Post()
  create(@Body(ValidationPipe) ClientsCreateDto: ClientsCreateDto) {
    return this.ClientsService.create(ClientsCreateDto);
  }
  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body() updateClientsDto: UpdateClientsDto,
  ) {
    return this.ClientsService.update(id, updateClientsDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.ClientsService.delete(id);
  }
}
