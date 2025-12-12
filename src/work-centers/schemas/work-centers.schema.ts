import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type WorkCentersDocument = WorkCenters & Document;
@Schema({ timestamps: true })
export class WorkCenters {
  @Prop({ unique: true, required: true })
  workCenterName: string;
}

export const WorkCentersSchema = SchemaFactory.createForClass(WorkCenters);
