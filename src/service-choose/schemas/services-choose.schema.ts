import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ServiceChooseDocument = ServicesChoose & Document;
@Schema({ timestamps: true })
export class ServicesChoose {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Services',
  })
  serviceRef: MongooseSchema.Types.ObjectId;
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Clients' })
  clientRef: MongooseSchema.Types.ObjectId;

  // @Prop({ required: true })
  // serviceRef: string;
  @Prop()
  serviceName: string;
  @Prop()
  expireDate: string;
  @Prop()
  unitRef: string;
  @Prop()
  maxOrder: number;
  @Prop()
  qty: number;
  @Prop()
  order: number;
  @Prop()
  price: number;
  // @Prop({ required: true })
  // clientRef: string;
  @Prop()
  nationalCode: string;
  @Prop()
  requesterIp?: string;
  @Prop()
  description?: string;
  @Prop()
  serviceImage?: Buffer;
  @Prop()
  serviceImageMimeType?: string;
  @Prop()
  serviceImageFileName?: string;
  @Prop()
  attachment?: Buffer;
  @Prop()
  attachmentMimeType?: string;
  @Prop()
  attachmentFileName?: string;
}

export const ServiceChooseDocument =
  SchemaFactory.createForClass(ServicesChoose);

ServiceChooseDocument.index({ serviceRef: 1, clientRef: 1 }, { unique: true });
