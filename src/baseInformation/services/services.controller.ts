/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { DeleteResult } from 'mongoose';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/common/guards/jwt-auth.guard';
import { ServicesService } from './services.service';

import { AllowAnonymous } from '../../auth/common/decorators/allow-anonymous.decorator';
import { UpdateServicesDto } from './dto/services-update.dto';
import { ServicesCreateDto } from './dto/services-create.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('Services')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class ServicesController {
  /**
   *
   */
  constructor(private readonly ServicesService: ServicesService) {}
  @Get()
  @ApiQuery({ name: 'serviceName', required: false })
  @AllowAnonymous()
  findAll(@Query('serviceName') serviceName?: string) {
    return this.ServicesService.findAll(serviceName);
  }
  @Get('getAllNoExpired')
  @ApiQuery({ name: 'serviceName', required: false })
  @AllowAnonymous()
  findAllNoExpired(@Query('serviceName') serviceName?: string) {
    return this.ServicesService.findAllNoExpired(serviceName);
  }
  @AllowAnonymous()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ServicesService.findById(id);
  }
  @Post()
  @AllowAnonymous()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        serviceName: { type: 'string', example: 'برنج' },
        unitRef: { type: 'string', example: '1' },
        maxOrder: { type: 'number', example: 5 },
        qty: { type: 'string', example: '5000' },
        expireDate: { type: 'string', example: '1404/01/01' },
        price: { type: 'number', example: '1000000' },
        clientRef: { type: 'number', example: '123' },
        description: { type: 'string', example: 'توضیحات' },
        requesterIp: { type: 'string', example: '192.168.1.1' },
        serviceImage: { type: 'string', format: 'binary' }, // file input
        attachment: { type: 'string', format: 'binary' }, // file input
      },
      required: [
        'serviceName',
        'unitRef',
        'maxOrder',
        'qty',
        'expireDate',
        'price',
        'clientRef',
        'requesterIp',
      ],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'serviceImage', maxCount: 1 },
        { name: 'attachment', maxCount: 1 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async create(
    @Req() req: Request,
    @Ip() ip: string,
    @Body() serviceCreateDto: ServicesCreateDto, // ValidationPipe removed
    @UploadedFiles()
    files: {
      serviceImage?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
  ) {
    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ?? ip;
    const service = await this.ServicesService.create(
      {
        ...serviceCreateDto,
        requesterIp: clientIp
          .replace('::ffff:', '')
          .replace('::1', '127.0.0.1'),
      },
      files.serviceImage?.[0],
      files.attachment?.[0],
    );

    // Only return safe fields
    return {
      id: service._id,
      serviceName: service.serviceName,
      attahcmentMimeType: service.attachmentMimeType,
    };
  }

  // update(
  //   @Param('id')
  //   id: string,
  //   @Body() updateServicesDto: UpdateServicesDto,
  // ) {
  //   return this.ServicesService.update(id, updateServicesDto);
  // }

  @Patch(':id')
  @AllowAnonymous()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        serviceName: { type: 'string', example: 'برنج' },
        unitRef: { type: 'string', example: '1' },
        maxOrder: { type: 'number', example: 5 },
        qty: { type: 'string', example: '5000' },
        expireDate: { type: 'string', example: '1404/01/01' },
        price: { type: 'number', example: '1000000' },
        clientRef: { type: 'number', example: '123' },
        description: { type: 'string', example: 'توضیحات' },
        requesterIp: { type: 'string', example: '192.168.1.1' },
        serviceImage: { type: 'string', format: 'binary' }, // file input
        attachment: { type: 'string', format: 'binary' }, // file input
      },
      required: [
        'serviceName',
        'unitRef',
        'maxOrder',
        'qty',
        'expireDate',
        'price',
        'clientRef',
        'requesterIp',
      ],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'serviceImage', maxCount: 1 },
        { name: 'attachment', maxCount: 1 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Ip() ip: string,
    @Body() updateServicesDto: UpdateServicesDto, // ValidationPipe removed
    @UploadedFiles()
    files: {
      serviceImage?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
  ) {
    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ?? ip;
    console.log(files.serviceImage?.[0]);
    return await this.ServicesService.update(
      id,
      {
        ...updateServicesDto,
        requesterIp: clientIp
          .replace('::ffff:', '')
          .replace('::1', '127.0.0.1'),
      },
      files.serviceImage?.[0],
      files.attachment?.[0],
    );

    // Only return safe fields
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.ServicesService.delete(id);
  }
}
