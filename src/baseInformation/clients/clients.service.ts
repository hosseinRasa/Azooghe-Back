import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';

import { Clients, ClientsDocument } from './schemas/clients.schema';

import { UpdateClientsDto } from './dto/clients-update.dto';
import { ClientsCreateDto } from './dto/clients-create.dto';
@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients.name) private ClientsModel: Model<ClientsDocument>,
  ) {}
  async findAll(description?: string) {
    if (description) {
      const Clients = await this.ClientsModel.findOne({
        description: description?.toLowerCase(),
      })
        .populate('organRef')
        .populate('workCenterRef')
        .lean()
        .exec();

      if (Clients) {
        return Clients;
      } else return null;
    }
    return await this.ClientsModel.find()
      .populate('organRef')
      .populate('workCenterRef')
      .lean()
      .exec();
  }

  async findById(id: string) {
    return await this.ClientsModel.findById(id)
      .populate('organRef')
      .populate('workCenterRef')
      .lean()
      .exec();
  }

  async create(ClientsCreateDto: ClientsCreateDto) {
    return await new this.ClientsModel(ClientsCreateDto).save();
  }
  async update(id: string, updatedClients: UpdateClientsDto) {
    return await this.ClientsModel.updateOne(
      { _id: Object(id) }, // filter
      { $set: { ...updatedClients } },
    ); // fields to update
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.ClientsModel.deleteOne({ _id: Object(id) }, {});
  }
}
