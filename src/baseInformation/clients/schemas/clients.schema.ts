import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ClientsDocument = Clients & Document;
@Schema({ timestamps: true })
export class Clients {
  @Prop({ required: true })
  clientCode: string;
  @Prop({ required: true })
  clientName: string;
  @Prop({ required: true })
  nationalCode: string;
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Organs' })
  organRef: MongooseSchema.Types.ObjectId;
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'WorkCenters',
  })
  workCenterRef: MongooseSchema.Types.ObjectId;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);
ClientsSchema.index({ organRef: 1, nationalCode: 1 }, { unique: true });
