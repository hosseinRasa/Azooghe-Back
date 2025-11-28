import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';

import { Organs, OrgansDocument } from './schemas/organs.schema';

import { OrgansCreateDto } from './dto/organs-create.dto';
import { UpdateOrgansDto } from './dto/organs-update.dto';
@Injectable()
export class OrgansService {
  constructor(
    @InjectModel(Organs.name) private OrgansModel: Model<OrgansDocument>,
  ) {}
  async findAll(description?: string) {
    if (description) {
      const Organs = await this.OrgansModel.findOne({
        description: description?.toLowerCase(),
      });

      if (Organs) {
        return Organs;
      } else return null;
    }
    return await this.OrgansModel.find();
  }

  async findById(id: string) {
    return await this.OrgansModel.findById(id);
  }

  async create(OrgansCreateDto: OrgansCreateDto) {
    return await new this.OrgansModel(OrgansCreateDto).save();
  }
  async update(id: string, updatedOrgans: UpdateOrgansDto) {
    return await this.OrgansModel.updateOne(
      { _id: Object(id) }, // filter
      { $set: { ...updatedOrgans } },
    ); // fields to update
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.OrgansModel.deleteOne({ _id: Object(id) }, {});
  }
}
