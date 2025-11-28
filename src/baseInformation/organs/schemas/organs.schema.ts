import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
export type OrgansDocument = Organs & Document;
@Schema({ timestamps: true })
export class Organs {
  @Prop({ required: true, unique: true })
  code: string;
  @Prop({ required: true })
  organName: string;
}

export const OrgansSchema = SchemaFactory.createForClass(Organs);
