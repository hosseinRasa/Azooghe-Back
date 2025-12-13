import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
export type ServicesDocument = Services & Document;
@Schema({ timestamps: true })
export class Services {
  @Prop({ unique: true, required: true })
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
  price: number;
  @Prop()
  clientRef: string;
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

  @Prop()
  likeCount?: number;
}

export const ServicesSchema = SchemaFactory.createForClass(Services);
