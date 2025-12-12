import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { UpdateWorkCentersDto } from './dto/work-centers-update.dto';
import {
  WorkCenters,
  WorkCentersDocument,
} from './schemas/work-centers.schema';
import { WorkCentersCreateDto } from './dto/work-centers-create.dto';

@Injectable()
export class WorkCentersService {
  constructor(
    @InjectModel(WorkCenters.name)
    private WorkCentersModel: Model<WorkCentersDocument>,
  ) {}
  async findAll(description?: string) {
    if (description) {
      const WorkCenters = await this.WorkCentersModel.findOne({
        description: description?.toLowerCase(),
      });

      if (WorkCenters) {
        return WorkCenters;
      } else return null;
    }
    return await this.WorkCentersModel.find();
  }

  async findById(id: string) {
    return await this.WorkCentersModel.findById(id);
  }

  async create(WorkCentersCreateDto: WorkCentersCreateDto) {
    return await new this.WorkCentersModel(WorkCentersCreateDto).save();
  }
  async update(id: string, updatedWorkCenters: UpdateWorkCentersDto) {
    return await this.WorkCentersModel.updateOne(
      { _id: Object(id) }, // filter
      { $set: { ...updatedWorkCenters } },
    ); // fields to update
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.WorkCentersModel.deleteOne({ _id: Object(id) }, {});
  }
}
