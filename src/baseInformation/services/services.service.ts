/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';

import { Services, ServicesDocument } from './schemas/services.schema';

import { UpdateServicesDto } from './dto/services-update.dto';
import { ServicesCreateDto } from './dto/services-create.dto';
import { toJalali } from '../../common/utility/date';
@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name) private ServicesModel: Model<ServicesDocument>,
  ) {}
  async findAll(serviceName?: string) {
    console.log(serviceName);
    if (serviceName) {
      const Services = await this.ServicesModel.findOne({
        serviceName: serviceName?.toLowerCase(),
      }).exec();

      if (Services) {
        return Services;
      } else return null;
    }
    return await this.ServicesModel.find()
      //.where({ expireDate: { $gte: toJalali(Date.now()) } })
      .lean()
      .exec();
  }
  async findAllNoExpired(serviceName?: string) {
    console.log(serviceName);
    if (serviceName) {
      const Services = await this.ServicesModel.findOne({
        serviceName: serviceName?.toLowerCase(),
      }).exec();

      if (Services) {
        return Services;
      } else return null;
    }
    return await this.ServicesModel.find()
      .where({ expireDate: { $gte: toJalali(Date.now()) } })
      .lean()
      .exec();
  }

  async findById(id: string) {
    console.log(id);
    return await this.ServicesModel.findById(id).lean().exec();
    // const obj = service?.toObject();
  }

  async create(
    servicesCreateDto: ServicesCreateDto,
    serviceImage?: Express.Multer.File,
    attachment?: Express.Multer.File,
  ) {
    console.log(servicesCreateDto);
    return await new this.ServicesModel({
      ...servicesCreateDto,
      serviceImage: serviceImage?.buffer,
      serviceImageMimeType: serviceImage?.mimetype,
      serviceImageFileName: serviceImage?.originalname,
      attachment: attachment?.buffer,
      attachmentMimeType: attachment?.mimetype,
      attachmentFileName: attachment?.originalname,
    }).save();
  }
  async update(
    id: string,
    dto: UpdateServicesDto,
    serviceImage?: Express.Multer.File,
    attachment?: Express.Multer.File,
  ) {
    const updateData: any = { ...dto };

    if (serviceImage) {
      updateData.serviceImage = serviceImage.buffer;
      updateData.serviceImageMimeType = serviceImage.mimetype;
      updateData.serviceImageFileName = serviceImage.originalname;
    }

    if (attachment) {
      updateData.attachment = attachment.buffer;
      updateData.attachmentMimeType = attachment.mimetype;
      updateData.attachmentFileName = attachment.originalname;
    }

    return this.ServicesModel.updateOne({ _id: id }, { $set: updateData });
  }

  // async update(id: string, updatedServices: UpdateServicesDto) {
  //   return await this.ServicesModel.updateOne(
  //     { _id: id }, // filter
  //     { $set: { ...updatedServices } },
  //   ); // fields to update
  // }
  async delete(id: string): Promise<DeleteResult> {
    return await this.ServicesModel.deleteOne({ _id: id }, {});
  }
}
