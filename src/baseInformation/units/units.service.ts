import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';

import { Units, UnitsDocument } from './schemas/units.schema';

import { UpdateUnitsDto } from './dto/units-update.dto';
import { UnitsCreateDto } from './dto/units-create.dto';
@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(Units.name) private UnitsModel: Model<UnitsDocument>,
  ) {}
  async findAll(description?: string) {
    if (description) {
      const Units = await this.UnitsModel.findOne({
        description: description?.toLowerCase(),
      });

      if (Units) {
        return Units;
      } else return null;
    }
    return await this.UnitsModel.find();
  }

  async findById(id: string) {
    return await this.UnitsModel.findById(id);
  }

  async create(unitsCreateDto: UnitsCreateDto) {
    return await new this.UnitsModel(unitsCreateDto).save();
  }
  async update(id: string, updatedUnits: UpdateUnitsDto) {
    return await this.UnitsModel.updateOne(
      { _id: Object(id) }, // filter
      { $set: { ...updatedUnits } },
    ); // fields to update
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.UnitsModel.deleteOne({ _id: Object(id) }, {});
  }
}
