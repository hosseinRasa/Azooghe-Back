/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import {
  ServiceChooseDocument,
  ServicesChoose,
} from './schemas/services-choose.schema';
import { ServicesCreateDto } from '../baseInformation/services/dto/services-create.dto';
import { UpdateServicesChooseDto } from './dto/services-choose-update.dto';
import { toJalali } from '../common/utility/date';

@Injectable()
export class ServiceChooseService {
  constructor(
    @InjectModel(ServicesChoose.name)
    private ServicesChooseModel: Model<ServiceChooseDocument>,
  ) {}
  async findAll(serviceName?: string) {
    console.log(serviceName);
    if (serviceName) {
      const Services = await this.ServicesChooseModel.findOne({
        serviceName: serviceName?.toLowerCase(),
      })
        .populate('serviceRef')
        .populate({
          path: 'clientRef', // first populate client
          populate: { path: 'organRef' }, // then populate organ inside client
        })
        .populate({
          path: 'clientRef', // first populate client
          populate: { path: 'workCenterRef' }, // then populate workCenter inside client
        })
        .exec();

      if (Services) {
        return Services;
      } else return null;
    }

    return await this.ServicesChooseModel.find()
      .populate('serviceRef')
      .populate({
        path: 'clientRef', // first populate client
        populate: { path: 'organRef' }, // then populate organ inside client
      })
      .populate({
        path: 'clientRef', // first populate client
        populate: { path: 'workCenterRef' }, // then populate workCenter inside client
      })
      // .where({
      //   expireDate: { $gte: toJalali(new Date()) },
      // })
      .sort({ serviceRef: 1 }) // newest → oldest
      .lean()
      .exec();
  }

  async findById(id: string) {
    console.log(id);
    const service = await this.ServicesChooseModel.findById(id)
      .populate('serviceRef')
      .populate({
        path: 'clientRef', // first populate client
        populate: { path: 'organRef' }, // then populate organ inside client
      })
      .populate({
        path: 'clientRef', // first populate client
        populate: { path: 'workCenterRef' }, // then populate workCenter inside client
      })
      .exec();
    const obj = service?.toObject();
    return obj;
  }
  async findAllMyRequests(id: string) {
    console.log(id);
    const services = await this.ServicesChooseModel.find()
      .populate('serviceRef')
      .populate({
        path: 'clientRef', // first populate client
        populate: { path: 'organRef' }, // then populate organ inside client
      })
      .populate({
        path: 'clientRef', // first populate client
        populate: { path: 'workCenterRef' }, // then populate workCenter inside client
      })
      .where({
        expireDate: { $gte: toJalali(new Date()) },
        clientRef: id,
      })
      .sort({ createdAt: -1 }) // newest → oldest
      .lean()
      .exec();

    return services;
  }

  async create(
    servicesCreateDto: ServicesCreateDto,
    serviceImage?: Express.Multer.File,
    attachment?: Express.Multer.File,
  ) {
    console.log(servicesCreateDto);
    return await new this.ServicesChooseModel({
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
    dto: UpdateServicesChooseDto,
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

    return this.ServicesChooseModel.updateOne(
      { _id: id },
      { $set: updateData },
    );
  }

  // async update(id: string, updatedServices: UpdateServicesDto) {
  //   return await this.ServiceChooseModel.updateOne(
  //     { _id: id }, // filter
  //     { $set: { ...updatedServices } },
  //   ); // fields to update
  // }
  async delete(id: string): Promise<DeleteResult> {
    return await this.ServicesChooseModel.deleteOne({ _id: id }, {});
  }
}
