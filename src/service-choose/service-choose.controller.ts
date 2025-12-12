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

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AllowAnonymous } from '../auth/common/decorators/allow-anonymous.decorator';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { UpdateServicesDto } from '../baseInformation/services/dto/services-update.dto';
import { ServiceChooseService } from './service-choose.service';
import { ServicesChooseCreateDto } from './dto/services-choose-create.dto';
import { ClientsService } from '../baseInformation/clients/clients.service';
import { toJalali } from '../common/utility/date';
import { ServicesService } from '../baseInformation/services/services.service';
import { UpdateServicesChooseDto } from './dto/services-choose-update.dto';

@Controller('ServiceChoose')
@UseGuards(JwtAuthGuard) // <-- Protects the route
@ApiBearerAuth() // <-- This adds the lock icon in Swagger
export class ServiceChooseController {
  /**
   *
   */
  constructor(
    private readonly ServiceChooseService: ServiceChooseService,
    private readonly clientsService: ClientsService,
    private readonly servicesService: ServicesService,
  ) {}
  @Get()
  @ApiQuery({ name: 'serviceName', required: false })
  @AllowAnonymous()
  findAll(@Query('serviceName') serviceName?: string) {
    return this.ServiceChooseService.findAll(serviceName);
  }
  @AllowAnonymous()
  @Get('myRequests/:id')
  findAllMyRequests(@Param('id') id: string) {
    return this.ServiceChooseService.findAllMyRequests(id);
  }
  @AllowAnonymous()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ServiceChooseService.findById(id);
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
        order: { type: 'string', example: '23' },
        expireDate: { type: 'string', example: '1404/01/01' },
        price: { type: 'number', example: '1000000' },
        clientRef: { type: 'number', example: '123' },
        nationalCode: { type: 'string', example: '4567891' },
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
        'order',
        'expireDate',
        'price',
        'clientRef',
        'nationalCode',
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
    @Body() serviceChooseCreateDto: ServicesChooseCreateDto, // ValidationPipe removed
    @UploadedFiles()
    files: {
      serviceImage?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
  ) {
    if (toJalali(Date.now()) > serviceChooseCreateDto.expireDate)
      throw new Error('آگهی مورد نظر منقضی شده است!');
    const mainService = await this.servicesService.findById(
      serviceChooseCreateDto.serviceRef,
    );
    //  console.log('Rasdafaf' + mainService?.serviceName);
    const remain =
      (mainService?.qty as number) -
      (serviceChooseCreateDto?.order as unknown as number);
    if (remain < 0) throw new Error('میزان سفارش از موجودی محصول بیشتر است  !');

    const client = await this.clientsService.findById(
      serviceChooseCreateDto.clientRef,
    );
    if (client?.nationalCode !== serviceChooseCreateDto.nationalCode)
      throw new Error('کد ملی وارد شده با پرسنل انتخاب شده مطابقت ندارد!');

    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ?? ip;
    const service = await this.ServiceChooseService.create(
      {
        ...serviceChooseCreateDto,
        requesterIp: clientIp
          .replace('::ffff:', '')
          .replace('::1', '127.0.0.1'),
      },
      files.serviceImage?.[0],
      files.attachment?.[0],
    );

    const updateServicesDto = new UpdateServicesDto();

    await this.servicesService.update(serviceChooseCreateDto.serviceRef, {
      ...updateServicesDto,
      qty: remain.toString(),
    });
    // Only return safe fields
    return {
      id: service._id,
      serviceName: service.serviceName,
      attahcmentMimeType: service.attachmentMimeType,
      qty: remain,
    };
  }

  // update(
  //   @Param('id')
  //   id: string,
  //   @Body() updateServicesDto: UpdateServicesDto,
  // ) {
  //   return this.ServiceChooseService.update(id, updateServicesDto);
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
        order: { type: 'string', example: '23' },
        expireDate: { type: 'string', example: '1404/01/01' },
        price: { type: 'number', example: '1000000' },
        clientRef: { type: 'number', example: '123' },
        nationalCode: { type: 'string', example: '456789' },
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
        'order',
        'expireDate',
        'price',
        'clientRef',
        'nationalCode',
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
    @Body() updateServicesChooseDto: UpdateServicesChooseDto, // ValidationPipe removed
    @UploadedFiles()
    files: {
      serviceImage?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
  ) {
    const mainService = await this.servicesService.findById(
      updateServicesChooseDto.serviceRef as string,
    );

    const oldChoose = await this.findById(id);
    const remain =
      (mainService?.qty as number) +
      (oldChoose?.order as number) -
      (updateServicesChooseDto?.order as unknown as number);
    console.log(
      'Rasdafaf  ' +
        (mainService?.qty as number) +
        '  ' +
        (oldChoose?.order as number) +
        '  ' +
        (updateServicesChooseDto?.order as unknown as number),
    );
    if (remain < 0) throw new Error('میزان سفارش از موجودی محصول بیشتر است  !');

    // const client = await this.clientsService.findById(
    //   updateServicesChooseDto.clientRef as string,
    // );
    // if (client?.nationalCode !== updateServicesChooseDto.nationalCode)
    //   throw new Error('کد ملی وارد شده با پرسنل انتخاب شده مطابقت ندارد!');

    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ?? ip;
    console.log(files.serviceImage?.[0]);
    //به روز رسانی انتخاب قبلی
    const updated = await this.ServiceChooseService.update(
      id,
      {
        ...updateServicesChooseDto,
        requesterIp: clientIp
          .replace('::ffff:', '')
          .replace('::1', '127.0.0.1'),
      },
      files.serviceImage?.[0],
      files.attachment?.[0],
    );

    const updateServicesDto = new UpdateServicesDto(); //به روز رسانی سرویس اصلی

    await this.servicesService.update(
      updateServicesChooseDto.serviceRef as string,
      {
        ...updateServicesDto,
        qty: remain.toString(),
      },
    );
    return updated;
    // Only return safe fields
  }
  @AllowAnonymous()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    const serviceChoose = await this.findById(id);
    const mainServiceRef = (serviceChoose?.serviceRef as any)._id.toString();
    const mainService = await this.servicesService.findById(mainServiceRef);
    console.log(mainService);
    // console.log((serviceChoose?.serviceRef as any)._id.toString());
    const newQty =
      (serviceChoose?.order as number) + (mainService?.qty as number);
    const updateServicesDto = new UpdateServicesDto();
    await this.servicesService.update(mainServiceRef, {
      ...updateServicesDto,
      qty: newQty.toString(),
    });

    return this.ServiceChooseService.delete(id);
  }

  @Post('canShowMyRequests')
  @AllowAnonymous()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        clientRef: { type: 'number', example: '123' },
        nationalCode: { type: 'string', example: '4567891' },
        requesterIp: { type: 'string', example: '192.168.1.1' },
      },
      required: ['clientRef', 'nationalCode', 'requesterIp'],
    },
  })
  async canShowMyRequests(
    @Req() req: Request,
    @Ip() ip: string,
    @Body() serviceChooseCreateDto: ServicesChooseCreateDto, // ValidationPipe removed
  ) {
    const client = await this.clientsService.findById(
      serviceChooseCreateDto.clientRef,
    );
    if (client?.nationalCode !== serviceChooseCreateDto.nationalCode)
      throw new Error('کد ملی وارد شده با پرسنل انتخاب شده مطابقت ندارد!');

    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ?? ip;
    // const service = await this.ServiceChooseService.create({
    //   ...serviceChooseCreateDto,
    //   requesterIp: clientIp.replace('::ffff:', '').replace('::1', '127.0.0.1'),
    // });

    // Only return safe fields
    return {
      nationalCode: serviceChooseCreateDto.nationalCode,
      clientIp: clientIp,
    };
  }
}
